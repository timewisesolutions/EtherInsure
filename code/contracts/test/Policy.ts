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
    const policy = await Policy.deploy(600, 3);

    return { policy, owner, otherAccount };
  }

    describe("Deployment", function () {
    it("Get premium per annum (Aud $)", async function () {
      const { policy, owner } = await loadFixture(deployPolicyFixture);
      expect(await policy.get_premium_per_annum("Dog")).to.equal(618);
    });
    })

    it("Get premium per annum (ethers)", async function () {
      const { policy, owner } = await loadFixture(deployPolicyFixture);
      expect(await policy.get_premium_per_annum_inEth("Dog")).to.equal(ethers.parseEther("0.219144"));
    });

});