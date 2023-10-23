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

const ether_insure_the_company: string[] = [
  "0x78b621a425eFD15A568dBB44D3Bf16ff85F89B56",
];

const registered_vets: string[] = [
  "0x028C5B28B6121E39aa35C5A78b1E6616E1a63891",
];

const vaultInvesters: Map<string, number> = new Map([
  ["0xC52C6Fea6A855B999D77866b6cB669fCE3534318", 2], // one invester with 100% shares
]);

export function get_company_address() {
  return ether_insure_the_company;
}
export function get_registered_vet_addresses() {
  return registered_vets;
}

export function get_vaultInvesters() {
  return vaultInvesters;
}
