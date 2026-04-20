export interface Author {
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: Author;
  imageUrl: string;
  featured?: boolean;
  content?: string;
}

export const categories = ['All', 'Technology', 'Design', 'Engineering', 'Product'];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    title: 'The Future of Spatial Computing: Beyond the Headset',
    excerpt: 'Exploring how ambient interfaces and spatial awareness are reshaping our interaction with digital environments, moving beyond traditional screens.',
    category: 'Technology',
    date: 'Oct 24, 2023',
    readTime: '8 min read',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1633424479366-508b98165c69?w=1200&q=80',
    featured: true,
    content: `
      <p class="lead">The era of being tethered to a glowing rectangle is slowly ending. Ambient interfaces are stepping in to weave digital context seamlessly into our physical environments.</p>
      <p>When we think of spatial computing, our minds immediately jump to heavy headsets, VR goggles, and isolation. But the true promise of spatial technology lies in how it integrates with our peripheral senses—removing the barrier of the screen and allowing information to live organically within our spaces.</p>
      <h2>Redefining the Canvas</h2>
      <p>Today's user interfaces are constrained by physical dimensions. A 16-inch laptop. A 6-inch phone. But what happens when the entire room is the canvas? The transition isn't just about scaling up; it's about context. Applications will no longer just open in a window; they will anchor to physical objects, react to lighting, and understand the room's geometry.</p>
      <blockquote>"Spatial computing is not about augmenting reality, but rather elevating our relationship with the physical environment."</blockquote>
      <p>To prepare for this, designers must unlearn the rigid grids of 2D screens. The new Z-axis demands an understanding of depth, occlusion, and human ergonomics. Instead of clicks and taps, interactions will be governed by eye tracking, micro-gestures, and voice.</p>
      <h2>The Path Forward</h2>
      <ul>
        <li><strong>Ambient Presence:</strong> Interfaces that only reveal themselves when actively needed.</li>
        <li><strong>Contextual AI:</strong> Systems that understand what you're looking at and why.</li>
        <li><strong>Ergonomic Interaction:</strong> Designing for physical comfort over long sessions, not just visual appeal.</li>
      </ul>
      <p>The transition won't happen overnight. It will be a slow blending of our physical and digital realities until we can no longer tell where one ends and the other begins.</p>
    `
  },
  {
    id: 'p2',
    title: 'Minimalism in Modern System Design',
    excerpt: 'Why reducing complexity is becoming the primary metric for successful distributed systems architecture.',
    category: 'Engineering',
    date: 'Oct 22, 2023',
    readTime: '5 min read',
    author: {
      name: 'Marcus Ray',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80',
    featured: true,
    content: `
      <p class="lead">In an industry obsessed with building "more", the most resilient systems are often those built with "less".</p>
      <p>The microservices craze of the 2010s left many engineering organizations with a sprawling, incomprehensible web of dependencies. What was promised to be a solution for scale quickly became an operational nightmare, where a single request could bounce between twenty services before returning a response.</p>
      <h2>The Hidden Cost of Complexity</h2>
      <p>Every new component introduced into a system is a new failure mode. It's an extra layer of latency, an additional surface area for security vulnerabilities, and another domain context for a new developer to understand before they can ship value.</p>
      <blockquote>"Complexity is the enemy of execution. In systems design, it is the enemy of reliability."</blockquote>
      <p>We are seeing a profound shift back toward majestic monoliths and simplified architectures. Teams are realizing that unless you operate at the scale of massive tech giants, the overhead of managing complex distributed systems far outweighs the theoretical benefits.</p>
      <h2>Principles of Minimalist Architecture</h2>
      <ul>
        <li><strong>Consolidation:</strong> Merging related microservices back into single, cohesive units with strict module boundaries.</li>
        <li><strong>Boring Technology:</strong> Relying on proven, established databases like PostgreSQL rather than chasing the latest NoSQL trend.</li>
        <li><strong>Synchronous by Default:</strong> Avoiding complex event-driven architectures unless asynchronous processing is strictly required by the business domain.</li>
      </ul>
      <p>Ultimately, a system's architecture should reflect the actual needs of the product, not the aspirational scale of the engineering team. Minimalism isn't just an aesthetic choice in design; it's a survival tactic in systems engineering.</p>
    `
  },
  {
    id: 'p3',
    title: 'Designing for Zero-State',
    excerpt: 'The psychological impact of empty states and how to craft onboarding experiences that instantly engage users.',
    category: 'Design',
    date: 'Oct 20, 2023',
    readTime: '6 min read',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    featured: true
  },
  {
    id: 'p4',
    title: 'React Server Components in Production',
    excerpt: 'A deep dive into our migration journey and the performance benefits we observed.',
    category: 'Engineering',
    date: 'Oct 18, 2023',
    readTime: '12 min read',
    author: {
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80'
  },
  {
    id: 'p5',
    title: 'The Shift to Edge AI',
    excerpt: 'How running models locally is changing latency expectations for consumer applications.',
    category: 'Technology',
    date: 'Oct 15, 2023',
    readTime: '7 min read',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80'
  },
  {
    id: 'p6',
    title: 'Product Strategy in a Bear Market',
    excerpt: 'Focusing on core retention loops when acquisition channels become expensive.',
    category: 'Product',
    date: 'Oct 12, 2023',
    readTime: '9 min read',
    author: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
  },
  {
    id: 'p7',
    title: 'Typography Systems for Scale',
    excerpt: 'Building flexible type scales that adapt seamlessly from mobile to massive displays.',
    category: 'Design',
    date: 'Oct 10, 2023',
    readTime: '4 min read',
    author: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80'
  },
  {
    id: 'p8',
    title: 'Building Resilient Payment APIs',
    excerpt: 'Handling idempotency, retries, and network partitions gracefully.',
    category: 'Engineering',
    date: 'Oct 08, 2023',
    readTime: '15 min read',
    author: {
      name: 'Marcus Ray',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&q=80'
    },
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  }
];
