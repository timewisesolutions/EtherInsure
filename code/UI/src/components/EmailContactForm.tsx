import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ClaimPetInfo } from "./ClaimsUserMain";
import { Box, Container, Flex } from "@chakra-ui/react";
import { vet_names, vet_emails } from "@/config/user_config";

interface Props {
  claim_info: ClaimPetInfo;
}
const EmailContactForm = ({ claim_info }: Props) => {
  const form = useRef<HTMLFormElement>(null);
  console.log("email claim info:", claim_info);
  const email = vet_emails.get(claim_info.vetName);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault(); // prevents the page from reloading when you hit “Send”

    emailjs
      .sendForm(
        "service_lz1kzpa",
        "template_2epde78",
        form.current ?? "",
        "3O_WuSTpBX6LbHsnY"
      )
      .then(
        (result) => {
          // show the user a success message
        },
        (error) => {
          // show the user an error
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
    >
      <Container flex="1">
        <Box
          as="section"
          bg="bg-surface"
          py={{ base: "16", md: "20" }}
          minH="md"
          m={10}
        >
          <form ref={form} onSubmit={sendEmail}>
            <label>Your Name:</label>
            <input
              style={{ marginLeft: 20, marginBottom: 10 }}
              type="text"
              name="from_name"
            />
            <br />
            <label>To Name:</label>
            <input
              style={{ marginLeft: 20, marginBottom: 10 }}
              type="text"
              name="to_name"
              value={"Dr." + claim_info.vetName}
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
              value={claim_info.policyNumber}
              readOnly
            />
            <br />
            <label>Amount(Aud $):</label>
            <input
              style={{ marginLeft: 20, marginBottom: 10 }}
              type="text"
              name="amount"
              value={claim_info.claimAmount}
              readOnly
            />
            <br />
            <input
              style={{ marginLeft: 20, marginBottom: 10 }}
              type="submit"
              value="Send"
            />
          </form>
        </Box>
      </Container>
    </Flex>
  );
};

export default EmailContactForm;

/*
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="to_name" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />

*/
