import tkinter as tk
from tkinter import scrolledtext, ttk
import re
import math
from collections import defaultdict, Counter
from urllib.parse import urljoin, urlparse
import threading
import queue

class WebCrawler:
    """Simulates a web crawler that discovers and downloads pages"""
    def __init__(self):
        self.visited = set()
        self.to_visit = queue.Queue()
        
        # Simulated web pages (in real world, would fetch from internet)
        self.web_pages = {
            'https://example.com/': {
                'title': 'Example Domain - Home',
                'content': 'This is an example domain for testing search engines. Welcome to our website.',
                'links': ['https://example.com/about', 'https://example.com/contact']
            },
            'https://example.com/about': {
                'title': 'About Us - Example Domain',
                'content': 'Learn about our company. We provide excellent services and products to customers worldwide.',
                'links': ['https://example.com/', 'https://example.com/services']
            },
            'https://example.com/services': {
                'title': 'Our Services - Example Domain',
                'content': 'We offer web development, search engine optimization, and digital marketing services.',
                'links': ['https://example.com/', 'https://example.com/contact']
            },
            'https://example.com/contact': {
                'title': 'Contact Us - Example Domain',
                'content': 'Get in touch with our team. Email us or call for more information about our services.',
                'links': ['https://example.com/']
            },
            'https://tech.com/': {
                'title': 'Tech News - Latest Technology Updates',
                'content': 'Breaking news in technology, artificial intelligence, machine learning, and software development.',
                'links': ['https://tech.com/ai', 'https://tech.com/programming']
            },
            'https://tech.com/ai': {
                'title': 'Artificial Intelligence News',
                'content': 'Latest developments in AI, deep learning, neural networks, and machine learning algorithms.',
                'links': ['https://tech.com/', 'https://tech.com/programming']
            },
            'https://tech.com/programming': {
                'title': 'Programming Tutorials and Tips',
                'content': 'Learn Python, JavaScript, Java, and other programming languages. Coding tutorials and best practices.',
                'links': ['https://tech.com/', 'https://tech.com/ai']
            },
            'https://recipes.com/': {
                'title': 'Delicious Recipes - Cooking Made Easy',
                'content': 'Find amazing recipes for breakfast, lunch, dinner, and desserts. Cooking tips and techniques.',
                'links': ['https://recipes.com/pasta', 'https://recipes.com/desserts']
            },
            'https://recipes.com/pasta': {
                'title': 'Pasta Recipes - Italian Cooking',
                'content': 'Authentic Italian pasta recipes including spaghetti, lasagna, and carbonara. Easy cooking instructions.',
                'links': ['https://recipes.com/']
            },
            'https://recipes.com/desserts': {
                'title': 'Dessert Recipes - Sweet Treats',
                'content': 'Delicious dessert recipes including cakes, cookies, ice cream, and pastries. Baking tips included.',
                'links': ['https://recipes.com/']
            }
        }
        
    def crawl(self, start_url, max_pages=10):
        """Crawl web starting from start_url"""
        self.to_visit.put(start_url)
        crawled_pages = []
        
        while not self.to_visit.empty() and len(crawled_pages) < max_pages:
            url = self.to_visit.get()
            
            if url in self.visited or url not in self.web_pages:
                continue
                
            self.visited.add(url)
            page = self.web_pages[url]
            
            # Store crawled page
            crawled_pages.append({
                'url': url,
                'title': page['title'],
                'content': page['content']
            })
            
            # Add linked pages to queue
            for link in page.get('links', []):
                if link not in self.visited:
                    self.to_visit.put(link)
                    
        return crawled_pages

class Indexer:
    """Creates searchable index from crawled pages"""
    def __init__(self):
        self.inverted_index = defaultdict(list)  # word -> [(doc_id, frequency)]
        self.documents = {}  # doc_id -> document
        self.doc_count = 0
        
    def tokenize(self, text):
        """Convert text to tokens (words)"""
        # Convert to lowercase and extract words
        text = text.lower()
        words = re.findall(r'\b[a-z]+\b', text)
        return words
        
    def index_document(self, doc_id, title, content):
        """Add document to index"""
        # Combine title and content (title gets more weight)
        full_text = f"{title} {title} {content}"
        
        # Tokenize
        words = self.tokenize(full_text)
        
        # Count word frequencies
        word_freq = Counter(words)
        
        # Store in inverted index
        for word, freq in word_freq.items():
            self.inverted_index[word].append((doc_id, freq))
            
        # Store document
        self.documents[doc_id] = {
            'title': title,
            'content': content
        }
        
    def index_pages(self, pages):
        """Index multiple pages"""
        for page in pages:
            self.doc_count += 1
            self.index_document(self.doc_count, page['title'], page['content'])
            self.documents[self.doc_count]['url'] = page['url']

class SearchEngine:
    """Main search engine with ranking"""
    def __init__(self, indexer):
        self.indexer = indexer
        
    def calculate_tf_idf(self, term, doc_id, term_freq):
        """Calculate TF-IDF score"""
        # Term Frequency
        tf = term_freq
        
        # Inverse Document Frequency
        docs_with_term = len(self.indexer.inverted_index[term])
        total_docs = len(self.indexer.documents)
        idf = math.log(total_docs / (1 + docs_with_term))
        
        return tf * idf
        
    def search(self, query):
        """Search for documents matching query"""
        # Tokenize query
        query_terms = self.indexer.tokenize(query)
        
        if not query_terms:
            return []
            
        # Find documents containing query terms
        doc_scores = defaultdict(float)
        
        for term in query_terms:
            if term in self.indexer.inverted_index:
                for doc_id, freq in self.indexer.inverted_index[term]:
                    # Calculate TF-IDF score
                    score = self.calculate_tf_idf(term, doc_id, freq)
                    doc_scores[doc_id] += score
                    
        # Sort by score
        ranked_docs = sorted(doc_scores.items(), key=lambda x: x[1], reverse=True)
        
        # Prepare results
        results = []
        for doc_id, score in ranked_docs:
            doc = self.indexer.documents[doc_id]
            
            # Generate snippet
            snippet = self.generate_snippet(doc['content'], query_terms)
            
            results.append({
                'title': doc['title'],
                'url': doc['url'],
                'snippet': snippet,
                'score': score
            })
            
        return results
        
    def generate_snippet(self, content, query_terms, max_length=150):
        """Generate search result snippet"""
        content_lower = content.lower()
        
        # Find first occurrence of query term
        best_pos = len(content)
        for term in query_terms:
            pos = content_lower.find(term)
            if pos != -1 and pos < best_pos:
                best_pos = pos
                
        # Extract snippet around the term
        start = max(0, best_pos - 50)
        end = min(len(content), best_pos + max_length)
        
        snippet = content[start:end]
        
        # Add ellipsis
        if start > 0:
            snippet = "..." + snippet
        if end < len(content):
            snippet = snippet + "..."
            
        # Highlight query terms
        for term in query_terms:
            pattern = re.compile(re.escape(term), re.IGNORECASE)
            snippet = pattern.sub(lambda m: f"**{m.group()}**", snippet)
            
        return snippet

class SearchEngineGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Search Engine - Crawler, Indexer & Ranker")
        self.root.geometry("900x700")
        self.root.configure(bg='#f5f5f5')
        
        # Initialize components
        self.crawler = WebCrawler()
        self.indexer = Indexer()
        self.search_engine = None
        
        self.create_gui()
        
    def create_gui(self):
        # Header
        header = tk.Frame(self.root, bg='#4285f4', height=80)
        header.pack(fill=tk.X)
        header.pack_propagate(False)
        
        title = tk.Label(header, text="🔍 Search Engine", 
                        font=('Arial', 24, 'bold'), 
                        bg='#4285f4', fg='white')
        title.pack(pady=20)
        
        # Control panel
        control_frame = tk.Frame(self.root, bg='#f5f5f5', pady=15)
        control_frame.pack(fill=tk.X)
        
        tk.Button(control_frame, text="1. Crawl Web", 
                 command=self.crawl_web,
                 bg='#34a853', fg='white', 
                 font=('Arial', 11, 'bold'),
                 padx=15, pady=8).pack(side=tk.LEFT, padx=10)
        
        tk.Button(control_frame, text="2. Build Index", 
                 command=self.build_index,
                 bg='#fbbc04', fg='white',
                 font=('Arial', 11, 'bold'),
                 padx=15, pady=8).pack(side=tk.LEFT, padx=10)
        
        # Search box
        search_frame = tk.Frame(self.root, bg='white', pady=20)
        search_frame.pack(fill=tk.X, padx=20)
        
        self.search_entry = tk.Entry(search_frame, 
                                     font=('Arial', 14),
                                     relief=tk.FLAT,
                                     bg='white')
        self.search_entry.pack(side=tk.LEFT, fill=tk.X, expand=True, ipady=10, padx=10)
        self.search_entry.bind('<Return>', lambda e: self.perform_search())
        
        tk.Button(search_frame, text="Search", 
                 command=self.perform_search,
                 bg='#4285f4', fg='white',
                 font=('Arial', 12, 'bold'),
                 padx=20, pady=8).pack(side=tk.LEFT, padx=10)
        
        # Status label
        self.status_label = tk.Label(self.root, text="Click 'Crawl Web' to start", 
                                    font=('Arial', 10),
                                    bg='#f5f5f5', fg='#666')
        self.status_label.pack(pady=5)
        
        # Results area
        results_frame = tk.Frame(self.root, bg='#f5f5f5')
        results_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=10)
        
        scrollbar = tk.Scrollbar(results_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.results_text = tk.Text(results_frame, 
                                   wrap=tk.WORD,
                                   font=('Arial', 11),
                                   bg='white',
                                   yscrollcommand=scrollbar.set,
                                   padx=15, pady=15)
        self.results_text.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        scrollbar.config(command=self.results_text.yview)
        
        # Configure text tags
        self.results_text.tag_config('title', font=('Arial', 14, 'bold'), foreground="#0f0861")
        self.results_text.tag_config('url', font=('Arial', 10), foreground='#006621')
        self.results_text.tag_config('snippet', font=('Arial', 11), foreground='#545454')
        self.results_text.tag_config('highlight', font=('Arial', 11, 'bold'), foreground='#000')
        
    def crawl_web(self):
        """Crawl the web"""
        self.results_text.delete('1.0', tk.END)
        self.status_label.config(text="Crawling web pages...")
        self.root.update()
        
        # Crawl from multiple starting points
        all_pages = []
        start_urls = ['https://example.com/', 'https://tech.com/', 'https://recipes.com/']
        
        for url in start_urls:
            pages = self.crawler.crawl(url, max_pages=10)
            all_pages.extend(pages)
            
        self.crawled_pages = all_pages
        
        # Display results
        self.results_text.insert('1.0', f"✓ Successfully crawled {len(all_pages)} pages:\n\n")
        
        for page in all_pages:
            self.results_text.insert(tk.END, f"• {page['title']}\n", 'title')
            self.results_text.insert(tk.END, f"  {page['url']}\n\n", 'url')
            
        self.status_label.config(text=f"Crawled {len(all_pages)} pages. Click 'Build Index' to continue.")
        
    def build_index(self):
        """Build search index"""
        if not hasattr(self, 'crawled_pages'):
            self.status_label.config(text="Please crawl web first!")
            return
            
        self.status_label.config(text="Building search index...")
        self.root.update()
        
        # Index all pages
        self.indexer.index_pages(self.crawled_pages)
        self.search_engine = SearchEngine(self.indexer)
        
        # Display index stats
        self.results_text.delete('1.0', tk.END)
        self.results_text.insert('1.0', "✓ Search index built successfully!\n\n")
        self.results_text.insert(tk.END, f"Indexed Documents: {len(self.indexer.documents)}\n")
        self.results_text.insert(tk.END, f"Unique Terms: {len(self.indexer.inverted_index)}\n\n")
        self.results_text.insert(tk.END, "Ready to search! Try queries like:\n")
        self.results_text.insert(tk.END, "• 'technology artificial intelligence'\n")
        self.results_text.insert(tk.END, "• 'recipes cooking pasta'\n")
        self.results_text.insert(tk.END, "• 'services company'\n")
        
        self.status_label.config(text="Index ready. Enter a search query.")
        
    def perform_search(self):
        """Perform search"""
        if not self.search_engine:
            self.status_label.config(text="Please build index first!")
            return
            
        query = self.search_entry.get().strip()
        if not query:
            return
            
        self.status_label.config(text=f"Searching for: {query}")
        
        # Search
        results = self.search_engine.search(query)
        
        # Display results
        self.results_text.delete('1.0', tk.END)
        
        if not results:
            self.results_text.insert('1.0', "No results found.")
            return
            
        self.results_text.insert('1.0', f"Found {len(results)} results:\n\n")
        
        for i, result in enumerate(results, 1):
            self.results_text.insert(tk.END, f"{i}. {result['title']}\n", 'title')
            self.results_text.insert(tk.END, f"{result['url']}\n", 'url')
            
            # Parse and insert snippet with highlights
            snippet = result['snippet']
            parts = re.split(r'(\*\*.*?\*\*)', snippet)
            
            for part in parts:
                if part.startswith('**') and part.endswith('**'):
                    self.results_text.insert(tk.END, part[2:-2], 'highlight')
                else:
                    self.results_text.insert(tk.END, part, 'snippet')
                    
            self.results_text.insert(tk.END, f"\n(Relevance Score: {result['score']:.2f})\n\n\n")
            
        self.status_label.config(text=f"Found {len(results)} results for '{query}'")

if __name__ == "__main__":
    root = tk.Tk()
    app = SearchEngineGUI(root)
    root.mainloop()