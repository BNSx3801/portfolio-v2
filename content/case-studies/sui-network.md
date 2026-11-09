# Objective

The objective of this Research Report/Article is to analyse the Background, Features, Working Mechanism, Tokenomics and User Experience of the Sui Network. It will also compare Sui with similar protocols to enable deeper on-chain analysis and propose potential improvements where applicable.

# The Sui Network: An Introduction

Sui is a Layer-1 Blockchain designed for improved user experience through Social Login _(Google, Facebook, Twitch, Microsoft, etc.)_, higher transaction throughput through object-based modeling, security and verifiability through off-chain compute and zero-knowledge proofs, and reduced transaction costs through PTBs (Programmable Transaction Blocks).

# The Founding Team

Sui Network was created by Mysten Labs, a company established in 2021 by a group of leading engineers, cryptographers, and researchers. The core team consisted of:

1. **Evan Cheng - CEO & Co-Founder.** _Evan Cheng is the CEO and Co-founder of Sui. He previously served as Head of Research & Development for Meta’s Novi project and as a Technical Director at Meta. Before joining Meta, he spent ten years at Apple as a Senior Manager. In 2012, he received the ACM Software System Award for his contributions to compiler technology and system architecture._
2. **Sam Blackshear - CTO & Co-Founder.** _Sam Blackshear is the CTO and Co-founder of Sui. He was formerly Chief Engineer at Meta’s Novi project, where he created the Move programming language for Diem and led initiatives on blockchain programmability and security._
3. **Adeniyi Abiodun - CPO & Co-Founder.** _Adeniyi Abiodun is the CPO and Co-founder of Sui. He previously served as Head of Product Development at Meta’s Novi project. His earlier experience includes roles at VMware, Oracle, PeerNova, HSBC, and JPMorgan._
4. **George Danezis - Chief Scientist & Co-Founder.** _George Danezis is the Chief Scientist and Co-founder of Sui. He previously worked as a researcher at Meta’s Novi project and has held positions at Chainspace and Microsoft. His areas of expertise include cryptography and security._
5. **Kostas (Konstantinos) Chalkias - Founding Team, Cryptography Lead.** _Kostas Chalkias is a founding team member and Cryptography Lead at Sui. His prior experience includes roles at R3, Erybo, SafeMarket, and NewCrypt. His work focuses on applied cryptography and security protocols._

# Key Board & Executive Members

As of August 2025, the Sui Network’s governance and strategic leadership are organized primarly thorugh the Sui Foundation, an independent organization dedicated to adoption, development, and the global value accrual of the Sui Blockchain. The Sui Foundation itself is led by a baord and senior management, supplemented by special advisory roles, especially from hgih-profile partners and institutional stakeholders.

1. **Christian Thomposon - _Managing Director, Sui Foundation_**
   - Appointed in December 2024.
   - Former Deputy CISO at Meta and early team member of the Libra/Diem project.
   - Succeeds Dr. Greg Siourounis, who now serves as strategic advisor after leading Sui thorugh its mainnet launch and initial ecosystem growth.
2. **Raoul Pal - _Board Member, Sui Foundation_**
   - CEO of Real Vision.
   - Publicly confirmed as a member of the Sui Foundation Board.
   - Provides strategic oversight and helps shape broad adoption and fiscal governance.
3. **Dr. Greg Siourounis - _Strategic Advisor (Former Managing Director)_**
   - Key leadership figure since the FOundation’s inception in 2023.
   - Instrumental in early ecosystem structuring, product launches (zkLogin, Deepbook), and growth initiatives.
4. **Institutional Representation**

   Recent board and treasury strategy developments have involved institutional partners such as:
   - Marius Barnett (Chairman of the Board, Mill City Ventures and Lead Investor via Karatage).
   - Stephen Mackintosh (Chief Investment Officer, Mill City Ventures, and Co-Founder, Karatage).
5. **Mysten Labs Founders (_Core Protocol Stewards_)**
   - While not on the Sui Foundation Board, the principal architects of Sui such as Evan Cheng (CEO), Sam Blackshear (CTO), and Adeniyi Abiodun (CPO), remain deeply involved in protocol evolution as technical stewards, researchers, and ongoing ecosystem leaders.

# The Initial Support

- **Angel Investor**
  - _Elad Gill,_ an Entreprenuer and Angel Investor, known for early investments in companies such as Stripe, Coinbase, and Figma. He is also the co-founder of Color and former VP at Twitter. _Gil_ participated in Sui’s early fundraising providing initial financial backing to the team.
- **Pre-Seed Round**
  - Information not disclosed.
- **Seed Round**
  - Information not disclosed.
- **Series A**
  - _Date:_ December 2021
  - _Amount:_ USD 36 million
  - _Lead Investor:_ a16z
  - _Other Investors:_ Redpoint, Lightspeed Venture Parnters, Coinbase Ventures, Electric Capital, Standard Crypto, NFX, Slow Ventures, Scribble Ventures, Samsung NEXT.
- **Series B**
  - _Date_: September 2022
  - _Amount_: USD 300 million
  - _Valuation_: USD 2 billion
  - _Lead Investor:_ FTX Ventures
  - _Other Investors:_ a16z, Jump Crypto, Apollo, Binance Labs, Franklin Templeton, Coinbase Ventures, Circle Ventures, Lightspeed Venture Partners, Sino Global Capital, Dentsu Ventures, Greenoaks capita, O’Leary Ventures.

# Strategic Public Funding Events

![Sui's four IEOs in April–May 2023 on Bitforex Turbo Starter, OKX Jumpstart, KuCoin Spotlight and Bybit, each at USD 0.10 per token, with amount raised, ROI and all-time-high ROI](/assets/sui/funding.png)

> **What is an IEO?** An IEO stands for Initial Exchange Offering. Unlike an ICO (Initial Coin Offering), it is handled by an exchange as a partner.
>
> Before offering of the tokens to the general public, the Exchange conducts a thorough vetting process. The due diligence involves examining the project’s whitepaper, underlying tech, team’s credibility, etc.
>
> After this due diligence, the Token Sale is set up, with the token pricing, the hard cap for the funds being raised, etc.

Apart from the IEO, a _Private Placement_ also happened:

- _Date:_ July-August 2025.
- _Raised:_ USD 450 million.
- _Investor:_ Mill City Ventures.

> **What is a Private Placement?** A Private Placement is a direct sale of a company’s securities such as bonds, stocks, assets, etc. to a selected group of investors, rather than offering to the general public in open market.

# The Release Timeline

- **2021: The Initiation**
  - Facebook’s Diem project was cancelled.
  - Following this, the key engineers (as detailed in _The Founding Team_ section) came together to form Mysten Labs, which led to the creation of what is now known as the Sui Network.
- **2022: The Devnet Era**
  - The initial Devnet was launched for testing and feedback.
  - By August 2022, an incentivized public Testnet went live, engaging independent validators to test critical network features.
  - In December 2022, Wave 1 of the Testnet was successfully completed, focusing on performance and stability.
- **2023: The “Snap Snap” Timeline**
  - April 2023: Launch of the Community Access Program, enabling the sale and distribution of SUI tokens.
  - 3 May 2023: Launch of the Mainnet for public use with over 100 validators and more than 400 nodes.
  - July 2023: Multiple milestones achieved —
    - Launch of DeepBook, Sui’s native liquidity layer.
    - 1 million active accounts milestone.
    - Record of 65 million transactions in a single day.
  - 15 August 2023: Launch of zkLogin, enabling onboarding via Google, Facebook, and other Web2-style authentication methods.
  - By Q4 2023: Sui had reached 9 million active accounts and USD 500 million in Total Value Locked (TVL).
- **2024: One Year Later**
  - TVL surpassed USD 1.5 billion.
  - FDUSD, a stablecoin, was launched.
  - SuiNS token was introduced as the network’s naming service.
  - November 2024: A major network outage occurred, lasting two hours.

> **Cause of the Network Outage**
>
> The outage was not the result of a DDoS attack or chain manipulation. Instead, it was caused by a bug in the transaction scheduling logic. Specifically, a special type of transaction with a mutable shared object input and zero ‘MoveCall’ commands caused the estimated execution cost to fall to zero, triggering validator crashes across the network.

# Identifying The Gaps

Traditional blockchains such as Bitcoin and Ethereum established the foundational layer for a decentralized digital economy. However, these early networks faced significant limitations. As transaction volumes increased, network congestion became a persistent issue, resulting in slower transaction finality. This was primarily due to legacy architectural designs _(sequential vs parallel execution)_ and the limited capacity of validators. Congestion further contributed to higher transaction fees, reducing efficiency and accessibility.

> **Sequential vs Parallel Execution** Traditional Blockchains relied on sequential transaction processing, where each transaction had to be validated in order, which limited the throughput. In the later sections, we’ll dive into how the Object-Centric Model used in Sui helps in parallel execution of transactions without losing the verifiability.

On the programmability side, Solidity emerged as the dominant language for smart contract development in permissionless environments. However, it introduced notable security concerns. Even by 2025, several extensively audited protocols continued to suffer losses from vulnerabilities such as reentrancy attacks, underscoring persistent shortcomings in contract safety. Beyond security, earlier blockchains were constrained by their account-based model, which restricted flexibility in representing complex and composable assets.

User experience also presented a barrier to adoption. For Web2-native users, the requirement to manage wallets, understand public–private keys, handle seed phrases, and sign transactions created significant friction. An optimized solution, potentially incorporating mechanisms such as social logins, was necessary to bridge the gap between Web2 familiarity and Web3 infrastructure.

At the same time, the broader Web3 community aspired to bring Web2-scale applications fully on-chain, including areas such as real-world asset (RWA) tokenization, gaming, and high-frequency micro-transactions. However, given the performance constraints of existing networks, applications such as gaming which requires often and low-cost interactions remains infeasible.

# Sui & Solutions

## Object-Centric Data Model

Earlier blockchains relied on account-based state models. In these systems, the global state was represented as a mapping of accounts and balances, with smart contracts acting as executable code bound to specific addresses. While the concept was highly functional, this design carried limitations. The account model made it difficult to represent complex, dynamic assets beyond fungible tokens, leading to rigid abstractions.

Looking deeper into the problems:

- Since, in account-based state models, the user doesn’t own the token directly (the contract does), this naturally imposes restrictions on new kind of assets. A uniform data model would solve this.
- The need for multiple contracts that are not natively enforced by the blockchain adds to storage costs. Say, in context to Game Development, an avatar needs weapons, tracks levels, achievements, cooldowns, etc., which needs differenct ERCs.
- Furthermore, state mutability was heavily centered on account balances, and interactions between contracts often introduced security risks due to unclear ownership semantics.

Instead of treating accounts as the central unit of state, Sui structures all data as objects i.e. discrete, programmable units of storage and logic.

> **Definition of an Object in Sui** An object in Sui is the fundamental unit of state. Each object encapsulates data and metadata, making it a self-contained entity that can be created, owned, transferred, or mutated through transactions.

Every object in Sui is uniquely identifiable and tracked through the following key parameters:

1. **Unique ID:** A globally unique identifier distinguishing the object within the network.
2. **Version:** A counter reflecting how many times the object has been mutated, ensuring deterministic state evolution.
3. **Last Transaction Digest:** A reference to the transaction that most recently modified the object, supporting auditability.
4. **Owner:** Specifies who or what controls the object _(an address, another object, or the shared state)_.

Sui further classifies objects into distinct ownership categories, each serving specific functions within the system, which accelerate the operation speeds in specific usecases:

1. **Owned Objects:** Controlled by a single account or object, typically representing assets like tokens or NFTs. If singly-owned, the objects will be categorized under _parallel processing_ along with other transactions.
2. **Immutable Objects:** Created once and never changed, ensuring permananent and verifiable references, such as metadata or configuration files.
3. **Shared Objects:** Accessible and mutable by multiple parties, supporting collaborative applications.
4. **Wrapped Objects:** One object temporarily transferred into another object, enabling secure and reversible encapsulation of objects. The parent & child elements, both should be objects for this.

_Couple of Wrapping Methodologies such as Direct Wrapping, Wrapping through Option, Wrapping through Vector, etc. are available. The relevance with context to this report is relatively low._

> **Relation b/w Object-Centric Data Model & Increased Throughput.** Say, User-1 and User-2 both hold an NFT. User-1 wants to rename for his NFT, while User-2 wants to transfer the ownership of the NFT to another address. Since, both of them are objects, which are pre-owned by an object, both of them are segregated transactions. This can further be placed for parallel processing through the Custom Transfer Policies and Custom Indexing Frameworks/Pipelines.

**The Benefit:**

- _Object Ownership_ reduces the attack vectors in comparison to contract-enforced logic.
- _Object Versioning_ allows the runtime to easily detect conflicting transactions enabling safety in parallel exeuction.
- _Object Nesting_ allows objects to be contained within other objects enabling flexible structures for real-world assets and heirarchical compositions that can be programatically defined.
- _Custom Transfer Policies_ allow transfer between _account-to-object_ as well as _object-to-object_, opening up possibilities of modular DeFi frameworks, more inclining towards gaming primitives.

## Programmable Transaction Blocks (PTBs)

In conventional blockchains, one action (say, a function call, a mint or burn) implies a transaction. In PTBs, multiple such small actions are combined into one mini-block, and they are all executed together. In such execution patterns, either all the actions are executed or all of them fail.

The benefits include prevention of partial failure, gas efficiency as the network load reduces. The metrics also include that a PTB can perform upto 1,024 unique operations in a single execution.

Previously, every single transaction/action was processed independently, leading to consumption of gas per transaction, and congesting the network in the same process. With PTBs, as Multiple Transactions are getting bunched, the entire block’s bytecode is generated, and that is processed as a single transaction, thereby reducing the network congestion and the gas fees.

As great as PTBs sound, there are some shortcomings. Intricate Programming Patterns such as looping/branching/custom state machines aren’t allowed. In such cases, a new Move Package must be published. Subsequently, the Move Package then can be called inside the Move Module. The limitation is to reduce the time lag. As the transaction combination must terminate quickly. Complex programming practises can increase the time complexity, thereby generating lag.

## Consensus Mechanism: Narwhal and Tusk

Consensus remains one of the most critical bottlenecks in blockchain design ultimately limiting the throughput and time-to-finality. Traditional protocols such as PBFT or HotStuff require leaders to not only propose the order of transactions but also disseminate large transaction data in the necessary mempools. This mechanisms creates a delay whenever leaders fall short on their operations. For applications demanding high throughput and resilience, such mechanism is highly inefficient and inadequate.

Sui utilizes the Narwhal and Tusk Protocols which ensures that trsansaction data is broadcasted and stored, and the order of transactions is also established, respectively. The process is asynchronous.

### Narwhal: DAG-Based DA Layer

Narwhal functions as a _Directed Acyclic Graph (DAG)_ mempool and storage layer, designed to address the data broadcasting bottleneck. It replaces the linear mempool structure, common in many blockchains with a round-based DAG of certified headers.

The mechanism involves clients sending transactions to validators pool. The transactions get batched together and validator’s primary node then produces headers containing the batch digests and parent references from the previous round. Once a quorum of validators sign a header, it forms a certificate, guaranteeing that the referenced data is both durable and retrievable.

### Tusk: Asynchronous Ordering of Transactions

Built on-top of Narwhal, Tusk provides an asynchronous consensus mechanism that leverages the DAG to order transactions without introducing additional communication overhead.

Its design revolves around leader selection by shared coin. In every odd-numbered round, a common radnom coin elects a leader from the previous round. If subsequent blocks provide sufficient support for that leader, the leader and its entire causual history are committed. Because causality is embedded in Narwhal’s strcutre, committing a leader automatically orders a large prefix of prior transactions.

The most obvious advantage being protection from adversaries, as the next leader cannot be consistently predicted or censored. The subsidiary benefits include fully asynchronous conditions and removing the need for consensus-specific communications.

These combined lead to 4.5 rounds of Tusk per Block finality. This increases the throughput by an enormous amount.

## Gas & Storage Economics

Sui decomposes the cost model into execution gas and sotrage fees, with additional mechanisms such as _Gas Smashing_ and _Storage Fund_ to ensure both short-term efficiency and long-term viability.

### Gas Accounting and Gas Smashing

Every transaction on Sui consumes gas, but the payment mechanism introduces an issue familiar to UTXO-based systems, the proliferation of small residual ‘gas coins’ after partial consumption. If left unmanaged, this fragmentatin creates usability frictions and unnecessary state bloat.

Sui addreesses this through _Gas Smashing_, a process that consolidates multiple smaller gas coins (not MISTs) into a single unit during transaction execution. The outcome is two-fold, namely State Cleanliness and User Experience.

### Explicit Storage Fees

In most blockchains, storage is under-priced i.e. once data is committed to state, it remains indefinitely unless protocols enfore pruning. This has long raised concerns about state bloat and validator cost asymmetry. Ethereum has debated _‘state rent’_ model for years, yet no clear implementation has been deployed.

Sui diverges by charging an explicit storage fee at the moment data enters state. This fee reflects the real economic cost of validators persisting objects over time. The separation of execution gas (_memory usage during execution_) from storage cost (_persistent burden on chain state_) aligns the incentives of users and validators more precisely.

### The Storage Fund

To address the problem of disproportionate costs on late entrant validators, Sui introduced the concept of Storage Fund. This fund serves as a perpetual cache of SUI that never fully depletes. Instead, it is staked across the validator set, compounding and generating staking rewards over time, implying that the principal amount is never touched.

The fund also grows proportionally with the network usage. In effect, the Storage Fund functions as a long-term investment for Sui’s data layer.

### Storage Rebate and Object Lifestyle

An additional feature is the storage rebate, when objects are deleted from state, a portion of the originally paid storage fee can be reclaimed. This incentivizes developers to design applications that actively manage object lifecycles rather than leaving unused data in perpetuity.

# Tokenomics

Native Token: _SUI_

## Role & Utility

- Medium of Exchange, Unit of Account, Store of Value.
- Unit used for gas fees (for both storage and computation).
- Enables participation in on-chain governance, including protocol upgrade voting.

## Total Supply & Circulation

- Total supply is capped at 10 billion SUI.
- At Mainnet launch (May 2023), approxiamtely 5% of tokens were in circulation, with the remainder vesting over time.
- At the time of writing, 3.51 billion SUI is unlocked and circulation.
- At the time of writing, the FDV (based on total supply) floats at USD 34.4 Billion.

## Distribution & Vesting Schedule

1. **52.5%** Allocated (Unreleased to 2030)
2. **10.6%** Commuity Reserve (Community Grants, Ecosystem Support)
3. **9.5%** Stake Subsidies (Validator Incentives)
4. **7.1%** Series-A Investors
5. **7.0%** Series-B Investors
6. **6.1%** Early Contributors (Team, Advisors, etc.)
7. **5.8%** Communnity Access Program to Pre-Launch Supporters.
8. **1.6%** Mysten Labs Treasury

## Recent Charts

![SUI price chart from CoinMarketCap, mid-2023 to August 2025, on a log scale: from about 1.40 USD at launch down to roughly 0.40, then up past 4 and settling near 3.4](/assets/sui/tokenomics-chart.png)

# User Experience

## zkLogin

zkLogin allows users to create and access wallets using familiar web2 identity providers such as Google, Facebook, Apple, Twich, Microsoft, Slack, Kakao, AWS, Karrier One, etc. It combines OAuth-based login with zero-knowledge proofs (zkSNARKs), ensuring privacy-preserving verification of identity credentials while linking them to a persistent Sui on-chain address.

### High Level Working

1. **Ephemeral Key Pair Generation** A wallet generates an ephemeral key pair (short-term public and private keys) for each login session.
2. **OAuth Login with Nonce** The user performs an OAuth login with a nonce corresponding to the ephemeral public key. This nonce binds the IdP-issued credential to the ephemeral wallet, ensuring authenticity.
3. **zkSNARK Proof Generation** Using zkSNARKs, a proof is generated that a valid JWT (JSON Web Token) was issued by IdP X for user Y with nonce Z, linked to ephemeral key K.
4. **Persistent Sui Address Derivation** Although, ephemeral keys are generated for every login, they do not create a new wallet each time. Instead, the proof ensures that as long as the JWT remains the same, the system maps back to the same persistent Sui address.

### The Ceremony

zkLogin relies on _Groth16 zkSNARKs_, which require a computation-specific Common Reference String (CRS). To ensure trust, Sui organized a Multi-Party Computation (MPC) ceremony to generate the CRS.

> **Why MPC?** If a single party generated the CRS, it could compromise security. With MPC, multiple contributors and randomness. As long as one contributor is honest, the setup is secure.

**The Protocol** Sui used MMORPG Protocol with two phases, namely Community and Circuit Phase. The Community Phase aimed at broad contributions of randomness, while the Circuit Phase aimed at randomness tailored for zkLogin Circuits. The process followed a sequential MPC model, where each participant added randomness after downloading the previous contribution.

The ceremony comprised of 111 contributions in total (82 browser-based, 29 docker-based). The ceremony ran from Sept 12-18, 2023. Each participant received a unique activation code, linked to their email, ensuring transparent verification.

> **Why Groth16 over others?**
>
> - Faster propagation across the network.
> - Lower on-chain storage and gas costs.
> - High verification speed.
> - Strong cryptographic guarantees under elliptic-curve assumptions.

### The Future

On one hand, it was a significant step forward for user onboarding to the platform. On the other hand, it was disastrous in the context of decentralization. Dependence on centralized IdPs undermined the very motive of a permissionless future. Some possible improvements are listed below:

1. **Decentralized Identifiy Providers** Incorporating decentralized identity standards to eliminate reliance on centralized web2 platforms.
2. **Account Recovery Enhancement** Developing recovery flows that combine zkLogin with other primitives (multi-sig guardians, social recovery, or hardware key pairing) to improve resilience.

## Nautilus: Off-Chain Computation w/ On-Chain Verifiability

As decentralized applications grow in sophistication, they often require computations that are either too resource-intensive or too sensitive to be executed efficiently within the blockchain’s consensus layer. To address this, Sui introduced Nautilus, a framework that securely delegates computation to _Trusted Execution Environment (TEEs)_ while ensuring results remain verifiable on-chain.

### How Nautilus Works

1. **Deployment to TEE**
   - Developers deploy an off-chain server within a self-managed TEE (currently supported through AWS Nitro Enclaves).
   - This allows complex or private computations to execute in an isolated environment, shielded from external tampering.
2. **Cryptographic Attestation**
   - The TEE produces a cryptographic attestation, which proves that the computation was executed in a secure, unmodified environment.
   - This attestation binds the computation to a specific enclave image, preventing malicious code injection.
3. **On-Chain Verification**
   - The attestation is sent to Sui smart contracts, which validate it against the provider’s root of trust.
   - Only after successful verification will the blockchain accept the enclave’s output as valid.
4. **Auditability**
   - Becuase the enclave’s integrity is anchored to the hardware provider’s trust root, its operations can be audited and independently verified, ensuring that execution hasn’t been tampered with.

### Current Limitations

- **Centralization Concerns** Reliance on AWS Nitro Enclaves means trust assumptions extend to cloud providers.
- **TEE Vulnerabilities** While secure, TEEs are not invulnerable. Side-channel attacks or hardware exploits could compromise integrity.

The future directions could include Broader TEE support with providers such as Intel SGX, ARM TrustZXone, etc., including Decentralized TEE Hosting.

# Ecosystem Showcasing

## Snapshot, August 2025

![DefiLlama overview of Sui in August 2025: 2.064 billion USD total value locked in DeFi, with stablecoin market cap, fees, DEX volume and the TVL curve since mid-2023](/assets/sui/ecosystem-aug-2025.png)

- Total value locked on Sui is about 2.0 to 2.1 billion dollars, with the largest positions in perpetuals, lending, and staking. DefiLlama reports 2.064 billion, with Bluefin, Scallop, Navi, and Aftermath among the leaders.
- Native USDC is live on Sui through Circle’s Cross Chain Transfer Protocol, which enables direct mint and redeem and improves settlement quality for DeFi.
- Bridges available include Wormhole Connect, Celer cBridge, and Axelar. Axelar announced mainnet integration for Sui in 2025, extending interchain messaging and token flows.
- Wallet access continues to expand. Phantom added support for Sui, and Sui Wallet implements zkLogin for email or social sign in.
- Gaming momentum includes the SuiPlay0X1 initiative with Playtron, a consumer device strategy that targets Sui native distribution for games.

## DeFi Stack

### Spot and Perps Trading

- Cetus, concentrated liquidity DEX with DeepBook routing; recognized by the Sui foundation as a core venue for spot liquidity.
- Bluefin, a leading venue for perpetual futures on Sui with efficient margin and active market making.
- Turbos Finance, AMM and aggregator backed by Jump and supported by Mysten Labs, positioned as a high efficiency marketplace on Sui.
- Aftermath Finance, all in one trading suite that spans spot AMM, router, perps, and liquid staking.
- NAVI Protocol powers Astros, a DEX aggregator and Perp DEX on Sui using an order book mechanism. Astros is currently in beta and has achieved a 24-hour trading volume of around $300 million, supported by trader incentives.
- Typus Finance launched a GMX-style perpetual DEX on Sui recently, featuring a TLP pool with assets such as $SUI and $USDC. Their 24-hour trading volume is modest (~$200,000), but the pool APR exceeds 100%, attracting liquidity staking.
- GLP Trading Model is part of the Sui perp DEX ecosystem, designed around liquidity pool models similar to GMX, allowing decentralized perpetual contract trading. It emphasizes liquidity incentives and aims to grow with the emerging Sui derivatives market.

### Lending, Leverage, and Credit

- Scallop and Navi are the two principal money markets by TVL share within Sui DeFi. Both appear in the current top protocols on Sui according to DefiLlama.
- Suilend, launched in 2024 by the team behind Solend, is now a large lending venue on Sui with features that include SpringSui liquid staking and an integrated swap path.
- NAVI powers Astros, which provides not only a DEX aggregator and perp exchange but also advanced lending and liquidity staking services within the Sui ecosystem.
- A DeFi protocol on Sui focused on unlocking capital efficiency via high LTV borrowing and predictable-cost loans, designed for long-term leverage.
- Powers liquidity pools on Suilend and engages in automated yield strategies by redepositing idle liquidity into lending protocols.
- Provides liquid staking and lending alongside other DeFi services like DEX aggregation and perp trading.

### Liquidity Layer

- DeepBook is the on chain liquidity layer that many front ends route through, enabling efficient matching and integration with CLMM pools. Cetus documents the integration pattern.

### Stablecoins and Fiat Rails

- Native USDC is supported through Circle, improving settlement and enabling straightforward treasury operations for Sui projects. FDUSD also circulates, and bridges provide wrapped assets where needed.
- Momentum functions as a ve(3,3) liquidity-driven DEX powering liquidity and adoption of BTCFi, a Bitcoin DeFi suite on Sui. Momentum is focused on liquid staking and deep liquidity provision.
- Enables slippage-free swaps between BTC variants on Sui and supports liquidity provision for BTCFi products.

## NFTs, Identity, and Consumer

### Marketplaces

- Clutchy and BlueMove are the principal NFT markets with active creator programs and Sui native collections.
- TradePort is a multi-chain NFT marketplace supporting Sui. It focuses on trading and analytics, offering advanced analytical tools, real-time price tracking, and portfolio management for NFT traders.
- Sui Gallery is one of the first NFT marketplaces on Sui, known for being creator-friendly with zero listing fees, an intuitive UI,a nd NFT minting tool.
- KeepSake speciailizes in NFT-powered gaming and digital collectibles, enablind trading in-game items, avatars, and metaverse assets.

### Identity and Wallets

- Sui Wallet supports zkLogin, which allows sign in with Google or Apple and binds an ephemeral key to a persistent Sui address through zero knowledge verification of the IdP issued token. Phantom added Sui network support for a broader retail base.
- Suiet Wallet, Sui Wallet, Surf Wallet, Slush Wallet, Martian Wallet, Gem Wallet, are some of the most comprehendible wallets.

### Games and Media

- Abyss World selected Sui for real time action role playing mechanics and asset ownership, reflecting the network’s parallel execution model.
- SuiPlay0X1 with Playtron signals a push into dedicated hardware distribution for Sui native titles.

## Infrastructure, Data, and Indexing

### Node and RPC Providers

- QuickNode operates Sui RPC and gRPC endpoints and has updated Sui support through mid 2025, offering low latency data access for production applications.
- Chainstack and BlockVision also provide managed RPC and indexing.
- Ankr, RockX, NOWNodes, PublicNode, Triton One, etc. are some of the other known RPC Providers.

### Indexing and Analytics

- BlockVision and BlockEden supply indexing services and explorer level access for Sui data, which helps teams avoid building and maintaining custom indexers.
- Nimbus Sui Indexer, Sentio Dash & Debugger, Space and Time, PYOR Governance Dashboards, are some of the indexing service providers and custom-built dashboards.

### Interoperability

- Wormhole Connect supports asset flows including NFTs and SUI itself. Celer’s cBridge enables transfers of ETH, WBTC, USDC, USDT, and DAI to and from Sui. Axelar announced mainnet integration for Sui in 2025 to extend general message passing and interchain token service.

# Conclusion

Sui Network introduces a new model for blockchain scalability through its object based design and parallel transaction execution. By combining efficient storage economics, flexible programmability, and innovations like zkLogin and Nautilus, Sui aims to deliver both performance and accessibility. Supported by a growing ecosystem and an active community, the network continues to evolve as a promising foundation for decentralized applications.

# References

- [docs.sui.io](https://docs.sui.io/)
- [sui.directory](https://sui.directory/?_project_type=api%2Cdeveloper-tools%2Cinfrastructure%2Csdk)
- [blog.sui.io](https://blog.sui.io/)
- [arxiv.org/pdf/2105.11827](https://arxiv.org/pdf/2105.11827)
- [thecurrencyanalytics.com: Sui sees record DeFi growth in Q2 2025](https://thecurrencyanalytics.com/altcoins/sui-sees-record-defi-growth-in-q2-2025-yet-sui-price-trails-191898)
- [kucoin.com: Top projects in the Sui Network ecosystem](https://www.kucoin.com/blog/top-projects-in-sui-network-ecosystem)
- [coincarp.com/project/sui](https://www.coincarp.com/project/sui/)
- [chainbroker.io/projects/sui](https://chainbroker.io/projects/sui/)
- [sfnet.com: Mill City Ventures closes USD 450 million private placement](https://www.sfnet.com/home/industry-data-publications/the-secured-lender/tsl-express-daily-articles-news/tsl-express-daily-articles-news/2025/08/07/mill-city-ventures-successfully-closes-$450-million-private-placement-commences-sui-treasury-strategy)
- [coincarp.com: SUI fundraising](https://www.coincarp.com/currencies/sui/fundraising/)

_Originally published on [Substack](https://bnsx3801.substack.com/p/sui-101), 27 August 2025._
