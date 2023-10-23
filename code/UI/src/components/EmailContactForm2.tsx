import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { VetPetApprovalInfo } from "./ClaimsVetMain";
import { Box, Container, Flex, Toast } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

interface Props {
  vet_approval_info: VetPetApprovalInfo;
  clearVetClaims: () => void;
}
const EmailContactForm2 = ({ vet_approval_info, clearVetClaims }: Props) => {
  const email = "yogidk@gmail.com";
  const form = useRef<HTMLFormElement>(null);
  const toast = useToast();

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”

    emailjs
      .sendForm(
        "service_lz1kzpa",
        "template_yu71ocn",
        form.current ?? "",
        "3O_WuSTpBX6LbHsnY"
      )
      .then(
        (result) => {
          // show the user a success message
          console.log("Sent Vet email success");
          // Move to claims home page
          toast({
            title: "Send Vet email success!",
            status: "success",
            position: "top",
          });
          clearVetClaims();
        },
        (error) => {
          // show the user an error
          console.log("Vet Email send error", error);
          toast({
            title: "Vet Send email failure, Retry!",
            status: "error",
            position: "top",
          });
        }
      );
  };

  return (
    <Flex
      as="main"
      role="main"
      direction="column"
      flex="1"
      py={{ base: "16", md: "10" }}
      minH="100vh"
    >
      <Container flex="1">
        <Box as="section" bg="bg-surface" py={{ base: "16", md: "20" }} m={10}>
          <form ref={form} onSubmit={sendEmail}>
            <label>Your Name:</label>
            <input
              style={{ marginLeft: 20, marginBottom: 10 }}
              type="text"
              name="from_name"
              value={"Dr." + vet_approval_info.vetName}
              readOnly
            />
            <br />
            <label>To Name:</label>
            <input
              style={{ marginLeft: 20, marginBottom: 10 }}
              type="text"
              name="to_name"
              value={"EtherInsure Company"}
              readOnly
            />
            <br />
            <label>Email:</label>
            <input
              style={{ marginLeft: 20, marginBottom: 10 }}
              type="email"
              name="to_email"
              value={email}
              readOnly
            />
            <br />
            <label>Message(If any):</label>
            <textarea name="message" />
            <br />
            <label>Policy Number:</label>
            <input
              style={{ marginLeft: 20, marginBottom: 20, marginTop: 20 }}
              type="text"
              name="policy_number"
              value={vet_approval_info.policyNumber}
              readOnly
            />
            <br />
            <label>Claim Number:</label>
            <input
              style={{ marginLeft: 20, marginBottom: 20, marginTop: 20 }}
              type="text"
              name="claim_number"
              value={vet_approval_info.claimNo}
              readOnly
            />
            <br />
            <button
              type="submit"
              onClick={sendEmail}
              style={{
                marginLeft: 20,
                marginBottom: 10,
                color: "white",
                fontWeight: "bold",
                background: "lightcoral",
              }}
              value="Send"
            >
              Send
            </button>
          </form>
        </Box>
      </Container>
    </Flex>
  );
};

export default EmailContactForm2;
