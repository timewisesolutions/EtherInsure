const ether_insure_the_company_localhost: string[] = [
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
];

const registered_vets_localhost: string[] = [
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
];

const vaultInvesters_localhost: Map<string, number> = new Map([
  ["0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", 100], // one invester with 100% shares
]);

export function get_company_addresses_localhost() {
  return ether_insure_the_company_localhost;
}
export function get_registered_vet_addresses_localhost() {
  return registered_vets_localhost;
}

export function get_vaultInvesters_localhost() {
  return vaultInvesters_localhost;
}
