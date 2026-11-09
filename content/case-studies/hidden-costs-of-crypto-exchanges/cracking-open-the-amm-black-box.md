![A wide-eyed boy opening a glowing box labelled AMM, with the words liquidity providers, traders, arbitrageurs and CFMMs rising out of it](/assets/hidden-costs/p3-cover.png)

So now, you (_a.k.a. Harry Potter_) have learned that stashing your Magical Coins (_crypto_) with the Goblins (_CEXs_) might not be the wisest move. Not your keys, not your Galleons. So, you step into the safer halls of Hogwarts — the decentralized exchanges — built by the open-source wizards of the internet.

_If you’re not caught up yet, you might want to read the previous two scrolls:_

- [Is DeFi Really Eating Up Wall Street?](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/is-defi-eating-wall-street)
- [CEXs Walked So DEXs Could Run! But, are they capable of running?](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/cexs-walked-so-dexs-could-run)

We saw how billions were lost in centralized collapse, how intermediaries act as gatekeepers, and how DEXs emerged as a way out — with SushiSwap, Uniswap, PancakeSwap and others now holding billions in total value locked.

But here’s the real question: **how do these DEXs actually work under the hood?**

_What makes a trade happen, without an order book?_

_Who keeps the system running smoothly?_

_And what even is an AMM?_

Time to crack open the black box and understand the magic powering every permissionless swap.

# A Quick Recap — What’s Even a DEX?

Alright, so we’ve established that DEXs are _Decentralized Exchanges_ — places where you can swap one token for another without having to hand your crypto over to a middleman in a suit.

_Picture this_: there's a pool that holds two tokens, say ETH and USDC. You drop one token in — the one you want to sell — and take the other one out — the one you want to buy. Nice and simple.

Every trade nudges the pool’s balance and slightly shifts the price. A small fee is charged along the way — some of it goes to the protocol, some to the people who made the pool possible (more on them soon), and a bit to cover network gas. Don’t worry, we’ll break that down properly in the _Implicit & Explicit Costs_ section.

So far, so good. But who are the people behind the curtain? Who keeps the pool full, prices in check, and everything running smoothly?

Let’s meet the key players of this magical little marketplace.

# The Cast of the Decentralized Stage

_Every trade has its actors — here’s who they are._

![Four men in fedoras at a card table under a chandelier, labelled The Pool, Arbitrageurs, Traders and Liquidity Providers](/assets/hidden-costs/p3-cast.png)

## The Pool

Think of the pool as a virtual reservoir where the magic happens. It holds two different tokens — say, ETH and USDC — and acts as the middle ground for all trades. When a trader wants to swap one token for another, they give one token to the pool and take the other out.

But here’s the catch: for this to work, the pool must have enough liquidity. If it doesn’t, trades start slipping or failing altogether. What breaks liquidity, and why it matters — that’s a story for the next article.

## Liquidity Providers

A pool without liquidity is just an empty box. Liquidity Providers are the folks who fill it up. They deposit both tokens into the pool — in a specific ratio — and in return, they earn a share of the trading fees whenever someone uses the pool.

They take on some risk (hello, Impermanent Loss), but also get a steady return. LPs are the unsung heroes making permissionless trading possible.

## Traders

This one’s easy — they’re here to trade. Swap one token for another, maybe because of market moves, maybe for yield strategies, or maybe just because they want to buy the dip. Traders are the ones keeping the wheels turning.

## Arbitrageurs

Here’s where it gets interesting. Since DEXs price assets based on a formula (not on supply-demand like regular markets), price mismatches can pop up between DEXs and the broader market.

Arbitrageurs spot these gaps. They buy low on one side, sell high on the other, and in the process, help bring DEX prices back in line with the external world. They’re not just chasing profit — they’re keeping the system balanced.

## The Protocol

None of this would exist without the underlying protocol. This is the smart contract code that defines how pools work, how swaps are calculated, how fees are split, and how LPs get rewarded.

Whether it's Uniswap, SushiSwap, or PancakeSwap — the protocol is the foundation. Everything else builds on top of it.

# Rewards, Fees & Everything in Between

_Because it's never just the price you see._

![Diagram: rewards, fees and everything in between splits into explicit costs (swap, gas and liquidity withdrawal fees), implicit costs (slippage, impermanent loss) and rewards (liquidity and staking rewards)](/assets/hidden-costs/p3-costs.png)

## Explicit Costs

Costs, the ones you can see — either shown upfront or charged at the time of transaction.

- **Swap Fee:** Every time you swap tokens, a percentage of the trade (usually 0.3% or less) is taken as a protocol fee. This is typically distributed among liquidity providers, and sometimes the protocol treasury.
- **Gas Fee:** Since DEXs run on smart contracts, every interaction — whether it's adding liquidity, removing it, or just making a swap — requires gas. The fee depends on the network you’re using. Swapping on Ethereum? Get ready to pay. On Layer-2s or sidechains like Arbitrum or BSC? Much lighter.
- **Liquidity Withdrawal Fee:** Some protocols apply a fee when liquidity is pulled from the pool, often to discourage short-term provisioning or sudden exits. Not all DEXs have this, but it’s worth noting when they do.

## Implicit Costs

Costs, that are harder to notice, but they still eat into your returns or increase what you pay.

- **Slippage:** When you place a trade, the final execution price might not be exactly what you saw at the start — especially in low-liquidity pools or during volatile moments. That difference is slippage, and it can sting if you’re trading large amounts or thin tokens.
- **Impermanent Loss:** This one hits liquidity providers. When the price of the two tokens in a pool changes significantly compared to when they were deposited, LPs may end up with a lower dollar value when they withdraw — even after earning fees. We’ll deep-dive into this in the next article.

## The Sweet Side, Rewards!

- **Liquidity Rewards:** Many DEXs incentivize LPs by distributing native tokens as rewards, on top of the trading fees they earn. This sweetens the deal and attracts more liquidity.
- **Staking Rewards:** Some protocols let you stake LP tokens or governance tokens to earn additional rewards. It’s a way to keep users engaged, committed, and rewarded for their contribution to the ecosystem.

# 🔍 Up Next: The Real Mechanics

We’ve seen who runs the show. But _how_ does the show run?

In the next piece, we’ll open up the core engine — the Constant Function Market Maker — and walk through how trades are priced, why it works (most of the time), and where things start to crack.

Because building a DEX is easy.

Making it efficient, fair, and unbreakable? That’s the real challenge.

_See you in the next one!_

_Originally published on [Substack](https://bnsx3801.substack.com/p/cracking-open-the-amm-black-box), 3 July 2025._
