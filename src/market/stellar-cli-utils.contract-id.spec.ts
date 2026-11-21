import { Keypair, StrKey } from '@stellar/stellar-sdk';
import { extractContractId } from './stellar-cli-utils';

const ID = StrKey.encodeContract(Keypair.random().rawPublicKey());

describe('extractContractId', () => {
  it('takes the id on the last line', () => {
    expect(extractContractId(`ℹ️ deploying\n${ID}\n`)).toBe(ID);
  });

  it('ignores a trailing info line after the id', () => {
    expect(extractContractId(`${ID}\nhint: view it at https://example.com\n`)).toBe(ID);
  });

  it('throws when no valid contract id is present', () => {
    expect(() => extractContractId('done\nnot-an-id\n')).toThrow('no valid contract id');
  });
});
