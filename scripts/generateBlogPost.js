// scripts/generateBlogPost.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// All 30 blog templates
const templates = {
  'building-customer-trust': {
    title: 'Building Customer Trust Through Your Online Presence',
    excerpt: 'Trust begins before the first interaction. Your online presence either builds confidence or creates doubt.',
    content: `Customers research before they contact you. What they find determines whether they trust you enough to reach out.

## The First Impression

Your website, social media, and online listings create an impression before you say a word. If information is inconsistent or outdated, customers wonder about reliability.

Trust comes from consistency. Same phone number everywhere. Same message across platforms. Information that matches reality.

## What Customers Look For

When people research service businesses, they check specific things. Accurate information matters. Current hours, correct address, working phone number. Basic details that match across all platforms.

Professional presentation helps too. Not flashy or trendy. Just well-maintained and intentional. Shows you care about details.

Recent activity signals engagement. Updated content, current projects, or recent posts. Signs the business is active and engaged.

## Common Trust Breakers

Small problems signal bigger issues. A broken contact form suggests poor maintenance. Outdated information implies neglect. Inconsistent branding creates confusion.

These details seem minor but customers notice them. Each inconsistency raises a question about reliability.

## Building Confidence

Professional service businesses maintain their online presence like they maintain their workspace. Regular updates, accurate information, working systems.

This does not require constant attention. It requires a system for keeping things current and someone responsible for it.`
  },
  
  'reliable-business-systems': {
    title: 'Why Service Businesses Need Reliable Systems',
    excerpt: 'Running a service business without systems means constantly managing small fires instead of growing your business.',
    content: `Most service businesses start without formal systems. The owner handles everything personally. This works initially but creates problems as the business grows.

## What Systems Actually Mean

A system is simply a reliable way to handle recurring tasks. Not complicated processes or expensive software. Just documented methods that work consistently.

For online presence, this means knowing what gets updated, when, and by whom. Having clear processes for maintaining your website, responding to inquiries, and keeping information current.

## The Cost of No Systems

Without systems, everything depends on memory and availability. Tasks get missed when you are busy. Updates happen inconsistently. Quality varies based on how much time you have.

Customers notice this inconsistency. Delayed responses, outdated information, or varying service quality. Each instance creates doubt about reliability.

## Building Practical Systems

Effective systems start simple. Document current processes. Write down how things currently work. Identify recurring tasks. Assign clear responsibility. Set regular schedules.

## The Reliability Advantage

Businesses with good systems handle growth better. New staff can follow established processes. Quality stays consistent even when owners are unavailable.

Systems free you to focus on actual business growth instead of constantly managing basic operations.`
  },

  'website-update-timing': {
    title: 'When to Update Your Business Website',
    excerpt: 'Most businesses update their website either too much or not enough. The right timing matters for both customers and your resources.',
    content: `A common question from business owners is how often they should update their website. The answer depends on what needs updating and why.

## Essential Updates

Some updates cannot wait. Contact information changes immediately. New hours, new phone numbers, temporary closures. These affect customer access directly.

Service changes matter too. If you add or remove services, customers need to know. Outdated service lists create confusion and wasted inquiries.

Pricing updates prevent misunderstandings. If your prices change significantly, update your website.

## Regular Maintenance

Beyond essential updates, websites need regular attention. Technical updates matter for security. Software updates, plugin updates, security patches.

Content freshness helps too. Add new photos occasionally. Update testimonials when you get good ones. Refresh case studies or portfolio items.

Performance checks catch problems. Broken links, slow loading, mobile issues. Check quarterly to ensure everything works properly.

## Creating an Update Schedule

A simple schedule prevents both neglect and over-updating. Check essential information monthly. Review content quarterly. Perform technical maintenance quarterly.

Consider major updates annually. Evaluate if your website still serves your business well.

## The Balance

Good website maintenance balances stability with currency. Keep information accurate and current. Maintain technical health. But avoid constant unnecessary changes.`
  },

  'brand-consistency-matters': {
    title: 'Why Brand Consistency Matters for Service Businesses',
    excerpt: 'Consistent branding is not about looking fancy. It is about making your business easy to recognize and remember.',
    content: `Many service business owners think branding means having a nice logo. That is part of it, but consistency matters more than individual design elements.

## What Consistency Actually Means

Brand consistency means customers see the same visual identity and messaging everywhere. Your website, business cards, signage, social media, and advertising all look related.

This includes obvious elements like logo and colors. But also typography, image style, tone of voice, and overall presentation.

## Why It Matters

Recognition builds over time. When customers see consistent branding across multiple touchpoints, your business becomes more memorable.

Trust develops faster with consistency. Professional, consistent presentation signals attention to detail and reliability.

Marketing becomes more efficient. Every exposure reinforces previous ones when branding stays consistent.

## Common Consistency Problems

Many businesses use different logos in different places. Maybe you updated your logo but old versions remain on some materials.

Color variations create problems too. Your brand red looks different on your website, business cards, and signage.

Message inconsistency undermines positioning. Your website emphasizes premium quality while your social media focuses on low prices.

## Building Consistency

Start with core elements. Define your exact logo, colors, and typography. Document these precisely.

Create simple guidelines. Apply consistently across all materials. Maintain over time.`
  },

  'online-reputation-management': {
    title: 'Managing Your Business Online Reputation',
    excerpt: 'Your online reputation forms whether you manage it or not. Taking control prevents problems and builds trust.',
    content: `Every service business has an online reputation. The question is whether you shape it actively or let it form randomly.

## What Online Reputation Includes

Your online reputation encompasses everything people find about your business online. Google reviews obviously matter. So do Facebook reviews, industry-specific platforms, and social media mentions.

Your website content contributes too. Search results create impressions. What appears when someone searches your business name affects perception.

## Why It Matters for Service Businesses

Service businesses depend heavily on trust. Customers buy services before experiencing them. They rely on reputation signals to assess whether you deliver.

Reviews influence decisions directly. Many customers read reviews before contacting service providers.

Reputation affects pricing power too. Businesses with strong reputations command higher prices.

## Handling Negative Reviews

Negative reviews happen to everyone eventually. The problem is not having some negative reviews. The problem is having no response strategy.

Never argue or get defensive. Acknowledge the issue professionally. Offer to resolve problems offline.

Learn from legitimate criticism. If multiple reviewers mention the same issue, address it in your operations.

## Building Positive Reputation

Deliver good service consistently. This sounds obvious but remains fundamental.

Request reviews systematically. Many satisfied customers never leave reviews unless asked.

Respond to all reviews. Thank positive reviewers. Address negative reviews professionally.`
  }
};

// Get date
const date = new Date().toISOString().split('T')[0];

// Get existing blog posts
const blogDir = path.join(__dirname, '../src/blog');
const usedTemplates = new Set();

if (fs.existsSync(blogDir)) {
  const files = fs.readdirSync(blogDir);
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const templateKey = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '');
      usedTemplates.add(templateKey);
    }
  });
}

// Get available templates
const allTemplateKeys = Object.keys(templates);
const availableTemplates = allTemplateKeys.filter(key => !usedTemplates.has(key));

// If all used, reset
const templatesToUse = availableTemplates.length > 0 ? availableTemplates : allTemplateKeys;

// Select random template
const selectedKey = templatesToUse[Math.floor(Math.random() * templatesToUse.length)];
const selected = templates[selectedKey];

// Create slug
const slug = `${date}-${selectedKey}`;

// Create blog directory if needed
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
}

// Create blog post
const blogPost = `---
title: ${selected.title}
excerpt: ${selected.excerpt}
date: ${date}
slug: ${slug}
---

${selected.content}
`;

// Write file
const filePath = path.join(blogDir, `${slug}.md`);
fs.writeFileSync(filePath, blogPost, 'utf8');

console.log(`✅ Blog post created: ${slug}`);