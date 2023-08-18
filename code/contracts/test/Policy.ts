import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { toNumber } from "ethers";

describe("Policy", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployPolicyFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Policy = await ethers.getContractFactory("PetPolicy");
    const policy = await Policy.deploy(0, 0, 0);

    const Dog = await ethers.getContractFactory("DogPolicy");
    const dogPolicy = await Dog.deploy();

    const Cat = await ethers.getContractFactory("CatPolicy");
    const catPolicy = await Cat.deploy();
    return { dogPolicy, catPolicy, policy, owner, otherAccount };
  }

    describe("Deployment", function () {

        it("Get Dog premium per annum (Aud $)", async function () {
            const { dogPolicy } = await loadFixture(deployPolicyFixture);
            const valueBigInt = await dogPolicy.get_premium_per_annum()
            const valueNumber: number = Number(valueBigInt) / (10 ** 18);
            expect(valueNumber).to.equal(618);
        });

        it("Get Dog premium per annum (ethers)", async function () {
            const { dogPolicy  } = await loadFixture(deployPolicyFixture);
            const weiValue = await dogPolicy.get_premium_per_annum_inEth()
            expect(weiValue).to.equal(ethers.parseEther("0.218261532"));
        });

        it("Get Dog max insured value", async function () {
            const { dogPolicy  } = await loadFixture(deployPolicyFixture);
            const maxValue = await dogPolicy.get_max_insured_value()
            expect(maxValue).to.equal(25000);
        });

        it("Get Cat premium per annum (Aud $)", async function () {
            const { catPolicy } = await loadFixture(deployPolicyFixture);
            const valueBigInt = await catPolicy.get_premium_per_annum()
            const valueNumber: number = Number(valueBigInt) / (10 ** 18);
            expect(valueNumber).to.equal(370.8);
        });

        it("Get Cat premium per annum (ethers)", async function () {
            const { catPolicy } = await loadFixture(deployPolicyFixture);
            const weiValue = await catPolicy.get_premium_per_annum_inEth()
            expect(weiValue).to.equal(ethers.parseEther("0.1309569192"));
        });

        it("Get Cat max insured value", async function () {
            const { catPolicy  } = await loadFixture(deployPolicyFixture);
            const maxValue = await catPolicy.get_max_insured_value()
            expect(maxValue).to.equal(20000);
        });
    })

    describe("Create a Pet Policy", function () {
        //DogURI:  bafybeifreg7kd4by4sozofs37nybx3s7nqrat2hyzzz36nub6ouusivb4e.ipfs.w3s.link
        //CatURI:  bafybeifx3i5nmjzqbrrxe4w4wvtnyasas727mthfnawq7wk7ndebm46vmm.ipfs.w3s.link
        // await token.connect(addr1)['mint(uint256)'](maxMintAmountPerTx, {value: ethers.utils.parseEther("1.0")});

        it("Create Dog & Cat Policy", async function () {
            const { dogPolicy, catPolicy } = await loadFixture(deployPolicyFixture);
            const DOG_URI = "bafybeifreg7kd4by4sozofs37nybx3s7nqrat2hyzzz36nub6ouusivb4e.ipfs.w3s.link"
            const CAT_URI = "bafybeifx3i5nmjzqbrrxe4w4wvtnyasas727mthfnawq7wk7ndebm46vmm.ipfs.w3s.link"
            let tx, rc, policy_count, policy_details, policy_premium, policy_no, t, formattedDate
            // first for Dog
            tx = await dogPolicy.create_policy(DOG_URI,{value: ethers.parseEther("1.0")})
            rc = await tx.wait(); // 0ms, as tx is already confirmed
            console.log("------------------------------------")
            //Event Params: NewPolicy(policyHolder, policyNumber,insured_amount)
            policy_no = rc?.logs[0].args[1] 
            console.log("Dog PolicyNumber:", policy_no)
            expect(rc?.logs[0].args[2]).to.eq(25000)
            policy_count = await dogPolicy.total_policies_count()
            expect(policy_count).to.eq(1)

            tx = await dogPolicy.get_policy_details(policy_no)
            policy_details = tx[0]
            policy_premium = tx[1]
            t = toNumber(policy_details[2])
            formattedDate = new Date(t * 1000);
            console.log("Dog Policy creation time:", formattedDate.toUTCString())
            console.log("Dog policy details:",policy_details)
            console.log("Dog premium paid:", policy_premium)
            console.log("------------------------------------")
            // for Cat
            tx = await catPolicy.create_policy(CAT_URI,{value: ethers.parseEther("1.0")})
            rc = await tx.wait(); // 0ms, as tx is already confirmed
            //Event Params: NewPolicy(policyHolder, policyNumber,insured_amount)
            policy_no = rc?.logs[0].args[1] 
            console.log("Cat PolicyNumber:", policy_no)
            expect(rc?.logs[0].args[2]).to.eq(20000)
            policy_count = await catPolicy.total_policies_count()
            expect(policy_count).to.eq(1)

            tx = await catPolicy.get_policy_details(policy_no)
            policy_details = tx[0]
            policy_premium = tx[1]
            t = toNumber(policy_details[2])
            formattedDate = new Date(t * 1000);
            console.log("Cat Policy creation time:", formattedDate.toUTCString())
            console.log("Cat policy details:",policy_details)
            console.log("Cat premium paid:", policy_premium)
       });


    })
});