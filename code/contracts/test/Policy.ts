import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

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
});