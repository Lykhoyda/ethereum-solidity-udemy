The project works wih your Metamask account in Rinkeby Network. To authenticate you need to provide the mnemonics and Infura Infrustructture URL.
Create a file in the root directory `.env.local` and put your data:

```
MNEMONIC='your twelve words mnemonics'
INFURA_URL='https://rinkeby.infura.io/v3/******'
```

To Run the project use the command
```bash
yarn run dev
```

To Run the tests
```bash
yarn run test
```

To compile the ETH contract
```bash
cd ethereum
node compile.js
```

To deploy the contract to Rinkeby network using Infura
```bash
cd ethereum
node deploy.js
```
