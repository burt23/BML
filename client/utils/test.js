import { mtx as MTX, script as Script} from 'bcoin';

// const getValFromForm = (form, name, type = 'input') => {
//   const el = form.querySelector(`${type}[name="${name}"]`);
//   return el ? el.value : undefined;
// };

let wallet = new HTTP.Wallet({
  network: 'simnet',
  apiKey: 'testme'
})

async function main() {
  let wdb = node.require('walletdb');
}

const makeScript = (data) => {
  const opcodes = Script.opcodes;
  const script = new Script();
  script.push(opcodes.OP_RETURN);
  script.push(data);
  script.compile();

  return script.toJSON();
};

export const reqProps = (form) => {
  const id = form.id;
  const passphrase = form.pass);
  const type = 'pubkeyhash';

  const propsMap = {
    createWallet: {
      type: 'POST',
      url: '/wallet',
      data: { id, passphrase, type: 'pubkeyhash' },
    }

  return propsMap;
};

export const checkInputs = (action, form) => {
  const idField = form.querySelector('input[name="walletId"]');
  const passphraseField = form.querySelector('input[name="passphrase"]');
  const id = getValFromForm(form, 'walletId');
  const passphrase = getValFromForm(form, 'passphrase');

  // some simple form validation
  if (!!idField && !!passphraseField) {
    if (!id.length || !passphrase.length) {
      alert('Provide an id and a passphrase'); // eslint-disable-line no-alert, no-undef
      return false;
    }
  } else if (!!idField && !id.length) {
    alert('Please provide a wallet id'); // eslint-disable-line no-alert, no-undef
    return false;
  }

  return true;
};
