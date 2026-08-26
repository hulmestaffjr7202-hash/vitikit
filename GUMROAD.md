# Gumroad 产品页文案 — VitiKit Pro
# 创建产品时直接复制：https://gumroad.com/products/new

## 产品名
VitiKit Pro — Unlimited Spray Records & Farm Branding

## 价格
$29（可加 "+ pay what you want" 提高客单价）

## URL slug
vitikit-pro

## 封面图建议
1200x800，黑底白字："Vineyard Spray Records, Done in 60 Seconds" + 网站截图

---

## 产品描述（正文）

**Stop hand-writing spray logs.**

VitiKit Pro turns your spray data into regulation-ready PDF application records in under a minute — right in your browser, no software to install, no account to create.

### What you get
- ♾️ **Unlimited PDF spray records** (free version: 3 total)
- 🏷️ **PRO badge on every record** — looks right during audits
- 🔒 **100% local** — your data never leaves your device
- 📶 **Works offline** once loaded
- 🆕 **All future Pro features** included (farm branding, block maps in development)

### What's in a record
Date, farm & block, area treated, target pest, product + EPA number, label rate, water volume, total product used (auto-calculated), REI, PHI, applicator, equipment, weather at application, notes, signature lines.

### How it works
1. Buy → receive license key instantly (VK-XXXXXXXXXXXX)
2. Open the Spray Records page → paste key → done
3. Key stays on your device. Works forever.

### The fine print
- One license = one farm operation (unlimited blocks & users on the same farm)
- 30-day money-back, no questions asked
- The label is legally authoritative — VitiKit is a record-keeping tool, not agronomic advice

### FAQ
**Q: Do you store my spray data?**
A: No. Records are generated in your browser. We literally can't see them.

**Q: Does it work on my phone in the vineyard?**
A: Yes — any modern browser. Generate the PDF, email or print it later.

**Q: What if I lose my key?**
A: Forward your Gumroad receipt to vitikit.app@gmail.com and we'll reissue it.

---

## Gumroad 设置清单
- [ ] Content: 上传一个 "license-keys.txt" 说明（密钥由 Gumroad license 功能生成）
- [ ] 开启 Gumroad **License keys** 功能（生成 VK- 前缀需在高级设置自定义前缀）
- [ ] 开启 "Pay what you want"（最低 $29）
- [ ] 添加 receipt 页面引导语："Paste your key into the Spray Records page →"
- [ ] SEO title: "Vineyard Spray Record Generator — PDF | VitiKit Pro"

## ⚠️ 注意
当前 spraylog.js 的密钥校验是**格式校验**（VK-+12位），不是真实验证。
Gumroad 上线后把真实密钥规则接入（或接 Gumroad license API），
否则懂前端的人能自己造钥匙。短期可接受（目标用户不搞逆向），中期要补。
