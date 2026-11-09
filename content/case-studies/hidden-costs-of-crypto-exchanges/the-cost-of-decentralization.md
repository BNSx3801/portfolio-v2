In the past few articles, we traced the ascent of decentralized exchanges — beginning with the billions of dollars locked across DEX protocols, then moving into the inner workings of liquidity pools, LP tokens, and the logic that powers automated market makers. We examined how DEXs rewrote the rules of trading, culminating in innovations like concentrated liquidity that promise better capital efficiency. On the surface, the numbers dazzled — Uniswap alone has routinely processed over **$1 billion** in daily volume, and total value locked (TVL) across DEXs once touched upwards of **$120 billion** during DeFi’s peak.

But it’s not all fairies and rainbows. As the ecosystem matures, the problems beneath the surface have started surfacing with numbers of their own. A report by Topaz Blue and Keyrock estimates that LPs on Uniswap v3 have, on average, lost **more to impermanent loss than they gained in fees** — to the tune of over **$260 million** across just a six-month period. MEV bots extracted **hundreds of millions** from unsuspecting traders during 2022 alone, according to Flashbots data. And fragmented liquidity continues to be a major bottleneck for DEX scalability and user experience.

This article is a departure from the optimistic arc of the series so far. It’s time to step beyond how DEXs work and begin grappling with where they falter. From slippage and MEV to impermanent loss and liquidity fragmentation, we’ll break down the critical pain points that the DEX ecosystem must address to move from innovation to resilience.

And if you haven’t yet read the earlier pieces in this series, you should for better context:

- [Is DeFi Really Eating Up Wall Street?](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/is-defi-eating-wall-street)
- [CEXs Walked So DEXs Could Run! But, are they capable of running?](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/cexs-walked-so-dexs-could-run)
- [Cracking Open the AMM Black Box](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/cracking-open-the-amm-black-box)
- [Uniswap 101: Providing Liquidity, Earning Fees, and Facing The Risks!](/proof-of-work/case-studies/hidden-costs-of-crypto-exchanges/uniswap-101)

# Liquidity: The Foundation & The Flaw

At the heart of every DEX lies a promise: deep, trustless liquidity. It’s the one thing that allows permissionless markets to function without intermediaries (unlike CEXs). More often than not, people confuse TVL with market depth though they are completely different:

- **TVL** is passive, it simply tells you how much value has been deposited.
- **Market Depth**, on the other hand, is active. It reflects how much of that liquidity is actually available for trading at or near the market price, without causing significant price movement. A pool can have millions locked, but if that capital is distributed across a wide price range (or out-of-range altother), the effective liquidity avaialble for any given trade might be negligible.

This lack of depth isn’t just an incovenience, it invites real problems. In shallow markets:

- Even small trades can **move the price substantially,** causing high slippage.
- This **discourages trading activity,** especially for larger players or aggregators.
- Fewer trades means **less fee revenue** for LPs, disincentivizing them from providing liquidity.
- And with fewer LPs, the pool gets even shallower i.e. a constant never-ending negative feedback loop.

Worse, such conditions create fertile ground for **market manipulation.** With little liquidity anchoring a pool, a modesty sized trade can push the price well beyond fair value. This opens up opportunities for frontruning, spoofing, and oracle manipulation, particularly in DeFi protocols that rely on AMM prices as inputs. We’ll see more about them in sections ahead.

Uniswap v3 attempted to solve capital inefficiency through concentrated liquidity, allowing LPs to allocate capital within narrow price ranges where trades are expected to occur. While elegant in theory, this design has introduced a new challenge: **liquidity misalignment.** When prices move outside an LP’s chosen range, their position becomes inactive i.e. invisible to trades, unproductive for fees, yet still included in the protocol’s TVL.

As per the metrics studied over a few pools for over an year, **more than 50% of Uniswap v3 positions were out of ranges** during volatile periods. Fortunately/unfortunately, the paradox of liquidity fuels the entire mechanism — yet its absence limits the system’s usability, scalability and trustworthiness.

Concentrated liquidity and the art of managing positions for optimal value generation is a distinct topic that warrants a dedicated article of its own. Stay tuned for that one!

## Slippage: Curve Moving Against You

Slippage is one of the most visible and costly frictions in DEX trading — and while often accepted as part of the DeFi experience, it is far from benign. Basically, slippage refers to the difference between the expected price of a trade and the actual price at which it executes. On centralized exchanges, deep order books and active market makers help absorb large trades with minimal price impact. But in AMM-based DEXs, price moves are **mathematically tied to the size of the trade relative to the liquidity available**.

i.e in constant product AMMs (like Uniswap v2 or v3 in a full-range configuration), prices follow the equation `x * y = k`. If a trader wants to buy token X using token Y, they remove X from the pool and add Y. Because the product `k` must remain constant, the pool adjusts the exchange rate — and **each additional unit purchased costs slightly more than the last**. The result is a curved price path: the larger the trade relative to the pool, the more it bends the price — and the more slippage the trader incurs.

Even in concentrated liquidity pools, the principle holds. If a trade consumes liquidity too quickly within a narrow price range, the pool must shift into the next available range — often at a worse price. This is especially common in volatile pairs or pools with uneven liquidity distribution.

_Not just User Incovenience, but System Inefficiency:_

- **Traders lose value** in the form of worse execution prices.
- **Large trades are penalized**, disincentivizing size and pushing volume toward aggregators or centralized venues.
- **Slippage creates arbitrage gaps**, which MEV bots exploit to rebalance prices across venues — extracting value in the process.
- And when slippage is consistently high, it becomes a tax on activity — **discouraging both traders and LPs**.

While it’s damaging, it also recursive in nature. High slippage leads to lower trading volumes, which reduces fee generation for LPs, which in turn disincentivizes liquidity provision, thereby increasing slippage further!

## Solution-to-Slippage?!

Slippage, though inherent to the design of constant function market makers, has been meaningfully reduced through strategic execution methods that optimize how trades interact with liquidity. The most effective approaches do not modify the underlying AMM formulas, but rather, orchestrate trades across multiple pools and venues with greater efficiency.

Protocols such as **1inch**, **Matcha**, **Paraswap**, and **CowSwap** are designed to source the most favorable execution by routing trades across a network of decentralized exchanges. These **aggregators** evaluate liquidity depth, transaction costs, and pool-specific fees in real time, and distribute the trade accordingly.

![Smart order routing: a trader's 1,000 USDC goes through an aggregator such as 1inch or Matcha and is split 30% to Uniswap v3, 25% to Balancer, 20% to SushiSwap and 25% to Curve, returning 0.89 ETH](/assets/hidden-costs/p5-aggregators.png)

A large trade — for instance, swapping 10,000 USDC for ETH — might be split across several venues: a portion routed to Uniswap v3, another to Balancer, some to Curve, and the rest to SushiSwap. Each path is selected to minimize price impact, leveraging deeper liquidity where available, or cheaper fees where beneficial.

This mechanism is powered by **smart order routing** algorithms, which consider a broad array of parameters beyond just pool size. These include expected slippage at each venue, gas efficiency, fee structures, and, in some cases, additional protections such as MEV-resistant batch auctions (as implemented by CowSwap).

By fragmenting large trades into multiple smaller legs, these systems effectively flatten the otherwise steep price curve associated with single-pool execution. The result is improved execution for users and less stress on any single liquidity pool.

# The MEV Dilemma

One of the most persistent, yet least understdood inefficiencies in DEX architecture is **Maximal Extractable Value** (MEV). It represents the profit that can be earned by strategically reordering, inserting, or censoring transactions within a block. The mechanism doesn’t exploit bugs in code; rather, it exploits **predictability in user behavior and transaction flow** — with decentralized exchanges as the primary hunting ground.

Among various MEV strategies, **sandwich attacks** have become particularly widespread on AMM platforms like Uniswap. These attacks unfold in three coordinated moves:

- an adversarial bot detects a large pending trade in the mempool,
- front-runs it with a buy order, lets the user’s trade move the price unfavorably,
- and then immediately sells at a higher price (back-run).

The profit is carved out from the user’s slippage — not as a side effect, but by deliberate construction.

The scale of the damage is measurable. According to Schär et al., over a 27-month window (May 2020 to August 2022), **356,000 sandwich attacks** were executed on Uniswap v2 and v3, **extracting over $18 million from victims** — all without consent, and often without awareness. The median loss per victim was **$16**, but large trades incurred disproportionately higher costs, sometimes in the hundreds or thousands of dollars.

This extraction isn’t limited to traders alone. The paper also details a more nuanced variant: **Just-in-Time (JIT) liquidity provision**, where a bot detects a lucrative swap, injects liquidity milliseconds before the trade, captures the fee, and withdraws immediately after. While this strategy technically supplies liquidity, it **dilutes returns for passive LPs**, who remain exposed to price risk without benefiting from that specific trade’s fees.

In one observed example, a JIT provider supplied liquidity to a Uniswap v3 pool for **less than 10 seconds**, earning **$2,994 in trading fees** with almost no exposure to impermanent loss — while passive LPs, who had been providing liquidity for hours, earned a fraction of that.

The takeaway is clear: MEV introduces a layer of **systemic asymmetry**. Those with mempool access, faster execution, and simulation infrastructure can reliably extract value — often at the expense of retail users and passive participants. Worse, this extraction is often invisible. It doesn’t appear on dashboards. The slippage just seems “high.” The yield just looks “low.”

And that’s the real cost of MEV. It corrodes the fairness of open markets, not through malicious contracts or protocol-level hacks, but through structural latency and informational arbitrage.

## So, Is MEV Inevitable as the Pools Are Public?

In a permissionless system, **visibility is a feature**, not a flaw. Every trade, every price, and every intention is broadcast in clear sight — not only to participants, but to adversaries with faster execution capabilities. As long as liquidity remains publicly addressable and transactions pass through public mempools, MEV — in one form or another — remains possible.

Over the last few years, developers and researchers have introduced thoughtful mitigation strategies that reshape _how_ and _when_ trades become visible, and _who_ can act on them. While none eliminate MEV entirely, they shift power away from extractive actors and toward those transacting in good faith.

1. **Private Order Flow.** _Tools like **Flashbots Protect**, **MEV-Blocker**, and **Eden Network** offer private RPC endpoints that route transactions through **off-chain relays** rather than the public mempool. This prevents MEV bots from front-running or sandwiching user trades — though it often requires trusting the relay operator to behave honestly._

   _While Flashbots pioneered this model, others have followed with more open, decentralized alternatives that attempt to reduce reliance on trusted intermediaries._

2. **Batch Auctions.** _Protocols like **CowSwap** remove the concept of per-trade ordering altogether by aggregating user intents over time windows and **executing them in batches**. Because all trades are settled simultaneously, **no single actor can front-run another** — MEV based on temporal priority becomes structurally impossible._

   _Cowswap also allows solvers (professional market makers or bots) to compete in offering the most optimal execution path, thereby internalizing arbitrage instead of letting it leak to external bots._

3. **Intent-Centric Protocols.** _Projects like **Anoma** and **SUAVE** propose a more fundamental shift: instead of submitting exact trades, users express **intents** (e.g., "I want to swap Token A for Token B, within a 1% price range"). Execution is then handled by an external, permissionless network of solvers — often with **privacy-preserving computation**, sealed-bid matching, or threshold cryptography._

   _The idea is simple: if the transaction doesn’t become visible until it’s finalized, then MEV extraction — at least the predatory kind — has no room to operate._

4. **Encrypted Mempools & Pre-Trade Privacy.** _Experimental designs are exploring ways to keep transaction contents hidden until they’re confirmed. By encrypting mempool contents (e.g., through threshold encryption) or using **trusted execution environments (TEEs)** to process encrypted trades, users can preserve privacy and eliminate front-running windows._

   _While still early in implementation, such approaches show promise — particularly for high-value trades and institutional players sensitive to execution quality._

These techniques do not “solve” MEV — but they **displace its extraction power**. In doing so, they shift control back toward users, and inject fairness back into markets where speed and simulation have long dictated the outcome.

# Impermanent Loss - The Elephant in the Room

Amongst all the challenges faced by liquidity providers, **Impermanent Loss** feels like the most dangerous and unpredictable one. And it also seems like something that may never be entirely eliminated — unless, of course, we decide to shift the entire order book on-chain.

Well, that’d solve every problem, right?

Indeed.

> **But before we dive deeper into impermanent loss, it’s worth asking: why don’t we just bring the full order book on-chain?**
>
> The most prominent barrier is **gas cost**. An order book is not a static record — it’s a continuous flurry of actions: listing, updating, price comparison, matching, execution, and cancellation. Running all of this on-chain would incur massive computation, leading to bloated blocks and prohibitively high fees.
>
> To sidestep this, AMMs turned to a more gas-efficient model: **Constant Function Market Makers (CFMMs)**. While far more scalable, they brought with them an entirely new set of trade-offs — one of which is impermanent loss.

Coming back to the concept — suppose a user deposits **$5,000 worth of ETH and $5,000 worth of USDC** into a 50/50 Uniswap v2 pool when ETH is priced at **$1,000**, i.e., they deposit **5 ETH and 5,000 USDC**. Now, if ETH doubles to **$2,000**, the AMM rebalances the position, selling ETH into USDC to maintain the constant product.

Upon withdrawal, the user receives approximately **3.54 ETH and 7,071 USDC**, totaling around **$14,142**. However, had they simply held on to the original assets — 5 ETH and 5,000 USDC — the portfolio would be worth **$15,000**. The difference, **$858**, is impermanent loss.

In essence, impermanent loss is **nothing but the loss of opportunity cost** due to the price movement of assets while they are deposited in a liquidity pool.

## Concentrated Liquidity, Tick Granularity & Impermanent Loss Exposure

With the advent of Uniswap v3, liquidity is no longer spread across the entire price curve. Instead, it is between two price boundaries, defined by what are known as ticks — discrete, fixed-width price intervals that segment the entire trading range.

The size of each tick is determined by the fee tier of the pool. With context to Uniswap v4, although multiple fee tiers exist and custom ones can be made, but as that initiates a new pool altogether, that leads to the problem of low liquidity again. For simpler understanding:

- A 0.05% fee pool has a tick spacing of 10.
- A 0.3% fee pool has tick spacing of 60.
- A 1% fee pool has tick spacing of 200.

The wider the tick spacing, the fewer the number of price intervals available — meaning less precision in selecting where liquidity is placed. The narrower the spacing, the finer the control over range placement, but also the greater the need for active management.

This granularity has a direct impact on IL risk:

- In tightly spaced tick environments (e.g. 0.05% tier), LPs can define very specific price windows. While this allows for highly efficient capital deployment, it also means that price movements between ticks can quickly activate or deactivate a position, often leaving it exposed to IL with very little buffer.
- In pools with wider tick spacing, the price must move more significantly to cross ticks. This creates a smoother exposure profile, but sarifices precision — and often results in lower fee income.

In either case, once the market price leaves an LP’s selected tick range, the position becomes entirely composed of one asset — lock in the impermanent loss if the liquidity is withdrawn at that point.

In conclusion, **the more granular the ticks,** the sharper the edge: small price moves can trigger sudden exposure to IL. The **less granular the ticks,** the softer the curve — but at the cost of flexibility.

# Beyond the Obvious: Frictions in the DEX Landscape

While challenges like impermanent loss, slippage, and MEV sit at the heart of DEX inefficiencies, they’re not the full picture. A range of quieter — yet consequential — issues continue to shape user experience, protocol performance, and liquidity dynamics across decentralized markets.

1. **LP Incentive Misalignment.** _In context to concentrated liquidity, while active manageres and automated vaults fine-tune their ranges for optimal yield, most LPs operate passively — and often underperform as a result. The protocol earns fees, traders receive smooth execugtion, but the average LP is left holding more risk than return._
2. **Long-Tail Liquidity Fragmentation.** _Newer tokens often suffer from shallow, scattered liquidity. With deployments spread across chains, fee tiers, and competing DEXs, price discovery becomes unreliable, and slippage remains stubbornly hgiht. This isn’t just a trader’s incovenience, but a structural barrier to token adotption and meaningful volume. That’s the main reason why a lot of Token Listings go on CEXs first._
3. **Risk of Composability.** _DeFi thrives on modularity — but with that comes dependency. A fault in one DEX pool, or a change in a protocol’s behavior, can ripple thorugh vaults, aggregators, and lending platforms that integrate with it. The very strength of open finance becomes a source of system fragility. However, this is not just limited to DEXs, but the overall concept of DeFi._
4. **Oracle Dependencies.** _In hybrid models or AMMs tied to extrenal data, oracle feeds can introduce latency or manipulation risk. Low-liquidity pairs become easy targets for price swings that temporarily distort on-chain refeerence prices — triggering unwanted liquidations or skewing trade execution._
5. **Cross-Chain Liquidity Distribution.** _The push toward multi-chain deployments has fractured liquidity. Instead of one deep market, protocols now maintain several shallow ones. Without effective bridging or unified routing layers, users face increased slippage and fewer efficient paths for execution. However, this also opens up cross-chain arbitrage opportunities._

# Closing Thoughts ❇️

Through this series, we’ve unpacked the DEX and AMM space from the ground up — tracing its mechanisms, exposing its frictions, and questioning its assumptions. From slippage and impermanent loss to MEV and incentive misalignments, the challenges are real — but so are the efforts to address them.

There are solutions. Some exist today, others are still in motion. But that’s a different conversation — one that’s fluid, experimental, and constantly evolving. It doesn’t belong to a static series, but to an open-ended dialogue.

This is where we pause. Thank you for reading. Don’t forget to subscribe! Chao!!

_Originally published on [Substack](https://bnsx3801.substack.com/p/the-cost-of-decentralization-design), 26 July 2025._
