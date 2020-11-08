/**
 * Split the name from the version in a string
 * @param input the input string
 */
export const splitNameVersion = (input: string): {
  name: string;
  version: string | undefined;
} => {
  const inputs = input.split('@');
  let version: string | undefined = '';
  if (inputs.length > 1 && inputs[0] === '') {
    inputs.shift();
    inputs[0] = '@' + inputs[0];
  }
  if (inputs.length > 1) {
    version = inputs.pop();
  }
  return {
    name: inputs.join('@'),
    version
  };
};