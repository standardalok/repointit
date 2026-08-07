import re
import tkinter as tk
from tkinter import scrolledtext, font as tkfont
from html.parser import HTMLParser

class DOMNode:
    """Represents a node in the DOM tree"""
    def __init__(self, tag, attributes=None, text=None):
        self.tag = tag
        self.attributes = attributes or {}
        self.text = text
        self.children = []
        self.parent = None
        self.styles = {}
        
    def add_child(self, child):
        child.parent = self
        self.children.append(child)
        
    def __repr__(self, level=0):
        indent = "  " * level
        result = f"{indent}<{self.tag}>{self.text or ''}\n"
        for child in self.children:
            result += child.__repr__(level + 1)
        return result

class CSSParser:
    """Simple CSS parser"""
    def __init__(self):
        self.rules = []
        
    def parse(self, css_text):
        """Parse CSS text into rules"""
        # Remove comments
        css_text = re.sub(r'/\*.*?\*/', '', css_text, flags=re.DOTALL)
        
        # Match selector { property: value; }
        pattern = r'([^{]+)\{([^}]+)\}'
        matches = re.findall(pattern, css_text)
        
        for selector, declarations in matches:
            selector = selector.strip()
            properties = {}
            
            for decl in declarations.split(';'):
                if ':' in decl:
                    prop, value = decl.split(':', 1)
                    properties[prop.strip()] = value.strip()
                    
            self.rules.append((selector, properties))
            
        return self.rules

class HTMLRenderParser(HTMLParser):
    """Parse HTML and build DOM tree"""
    def __init__(self):
        super().__init__()
        self.root = DOMNode('document')
        self.current = self.root
        self.stack = []
        
    def handle_starttag(self, tag, attrs):
        node = DOMNode(tag, dict(attrs))
        self.current.add_child(node)
        self.stack.append(self.current)
        self.current = node
        
    def handle_endtag(self, tag):
        if self.stack:
            self.current = self.stack.pop()
            
    def handle_data(self, data):
        data = data.strip()
        if data:
            text_node = DOMNode('text', text=data)
            self.current.add_child(text_node)

class LayoutBox:
    """Represents a layout box with position and dimensions"""
    def __init__(self, node, x=0, y=0, width=0, height=0):
        self.node = node
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.children = []
        
    def __repr__(self):
        return f"LayoutBox({self.node.tag}, x={self.x}, y={self.y}, w={self.width}, h={self.height})"

class RenderingEngine:
    """Main rendering engine"""
    def __init__(self, canvas, width=800):
        self.canvas = canvas
        self.width = width
        self.dom_tree = None
        self.css_rules = []
        self.layout_tree = None
        
    def parse_html(self, html_text):
        """Parse HTML into DOM tree"""
        parser = HTMLRenderParser()
        parser.feed(html_text)
        self.dom_tree = parser.root
        return self.dom_tree
        
    def parse_css(self, css_text):
        """Parse CSS rules"""
        parser = CSSParser()
        self.css_rules = parser.parse(css_text)
        return self.css_rules
        
    def apply_styles(self, node):
        """Apply CSS styles to DOM nodes"""
        # Default styles
        node.styles = {
            'color': 'black',
            'background-color': 'white',
            'font-size': '16',
            'font-weight': 'normal',
            'text-align': 'left',
            'margin': '5',
            'padding': '5',
            'display': 'block'
        }
        
        # Apply CSS rules
        for selector, properties in self.css_rules:
            # Simple tag selector
            if selector == node.tag:
                node.styles.update(properties)
            # Class selector
            elif selector.startswith('.') and 'class' in node.attributes:
                class_name = selector[1:]
                if class_name in node.attributes.get('class', '').split():
                    node.styles.update(properties)
            # ID selector
            elif selector.startswith('#') and 'id' in node.attributes:
                id_name = selector[1:]
                if id_name == node.attributes.get('id'):
                    node.styles.update(properties)
                    
        # Recursively apply to children
        for child in node.children:
            self.apply_styles(child)
            
    def layout(self, node, x=10, y=10, max_width=780):
        """Calculate layout positions (simplified box model)"""
        if node.tag == 'document':
            # Layout root children
            current_y = y
            for child in node.children:
                box = self.layout(child, x, current_y, max_width)
                if box:
                    current_y += box.height + int(node.styles.get('margin', 5))
            return None
            
        # Create layout box
        margin = int(node.styles.get('margin', 5))
        padding = int(node.styles.get('padding', 5))
        
        box = LayoutBox(node, x, y)
        
        # Calculate dimensions based on content
        if node.tag == 'text':
            # Text node
            font_size = int(node.parent.styles.get('font-size', 16))
            box.width = len(node.text) * (font_size * 0.6)  # Approximate
            box.height = font_size + padding * 2
        else:
            # Block element
            box.width = max_width
            box.height = padding * 2
            
            # Layout children
            current_y = y + padding
            for child in node.children:
                child_box = self.layout(child, x + padding, current_y, max_width - padding * 2)
                if child_box:
                    box.children.append(child_box)
                    current_y += child_box.height + margin
                    
            box.height += sum(c.height + margin for c in box.children)
            
        return box
        
    def paint(self, box):
        """Paint the layout boxes to canvas"""
        if not box:
            return
            
        node = box.node
        
        # Draw background
        bg_color = node.styles.get('background-color', 'white')
        if bg_color != 'white' and node.tag != 'text':
            self.canvas.create_rectangle(
                box.x, box.y, 
                box.x + box.width, box.y + box.height,
                fill=bg_color, outline=''
            )
            
        # Draw text
        if node.tag == 'text' and node.text:
            color = node.parent.styles.get('color', 'black')
            font_size = int(node.parent.styles.get('font-size', 16))
            font_weight = node.parent.styles.get('font-weight', 'normal')
            
            font_style = 'bold' if font_weight == 'bold' else 'normal'
            
            self.canvas.create_text(
                box.x, box.y,
                text=node.text,
                anchor='nw',
                fill=color,
                font=('Arial', font_size, font_style)
            )
            
        # Paint children
        for child in box.children:
            self.paint(child)
            
    def render(self, html, css=''):
        """Main render pipeline"""
        # 1. Parse HTML
        self.parse_html(html)
        
        # 2. Parse CSS
        if css:
            self.parse_css(css)
            
        # 3. Apply styles
        self.apply_styles(self.dom_tree)
        
        # 4. Layout
        self.layout_tree = []
        for child in self.dom_tree.children:
            box = self.layout(child, 10, 10, self.width - 20)
            if box:
                self.layout_tree.append(box)
                
        # 5. Paint
        self.canvas.delete('all')
        for box in self.layout_tree:
            self.paint(box)

class BrowserWindow:
    def __init__(self, root):
        self.root = root
        self.root.title("Simple Rendering Engine Demo")
        self.root.geometry("1000x700")
        
        # Top frame for input
        top_frame = tk.Frame(root, bg='#f0f0f0', pady=10)
        top_frame.pack(fill=tk.X)
        
        tk.Label(top_frame, text="HTML:", bg='#f0f0f0', font=('Arial', 10, 'bold')).pack()
        
        self.html_input = scrolledtext.ScrolledText(top_frame, height=8, wrap=tk.WORD)
        self.html_input.pack(fill=tk.X, padx=10, pady=5)
        self.html_input.insert('1.0', '''<h1>Welcome to My Rendering Engine</h1>
<p>This is a <b>simple</b> rendering engine demonstration.</p>
<div class="box">
    <h2>Features</h2>
    <p>It supports basic HTML tags and CSS styling.</p>
</div>
<p id="footer">Built from scratch in Python!</p>''')
        
        tk.Label(top_frame, text="CSS:", bg='#f0f0f0', font=('Arial', 10, 'bold')).pack()
        
        self.css_input = scrolledtext.ScrolledText(top_frame, height=6, wrap=tk.WORD)
        self.css_input.pack(fill=tk.X, padx=10, pady=5)
        self.css_input.insert('1.0', '''h1 { color: #2c3e50; font-size: 32; font-weight: bold; }
h2 { color: #3498db; font-size: 24; font-weight: bold; }
p { color: #34495e; font-size: 16; margin: 10; }
.box { background-color: #ecf0f1; padding: 15; margin: 10; }
#footer { color: #7f8c8d; font-size: 14; }
b { color: #e74c3c; font-weight: bold; }''')
        
        render_btn = tk.Button(top_frame, text="Render", command=self.render, 
                              bg='#3498db', fg='white', font=('Arial', 12, 'bold'),
                              padx=20, pady=5)
        render_btn.pack(pady=5)
        
        # Canvas for rendering
        canvas_frame = tk.Frame(root)
        canvas_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        scrollbar = tk.Scrollbar(canvas_frame)
        scrollbar.pack(side=tk.RIGHT, fill=tk.Y)
        
        self.canvas = tk.Canvas(canvas_frame, bg='white', yscrollcommand=scrollbar.set)
        self.canvas.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        
        scrollbar.config(command=self.canvas.yview)
        
        # Initialize rendering engine
        self.engine = RenderingEngine(self.canvas, width=960)
        
        # Initial render
        self.render()
        
    def render(self):
        html = self.html_input.get('1.0', tk.END)
        css = self.css_input.get('1.0', tk.END)
        
        self.engine.render(html, css)
        
        # Update scroll region
        self.canvas.config(scrollregion=self.canvas.bbox('all'))

if __name__ == "__main__":
    root = tk.Tk()
    app = BrowserWindow(root)
    root.mainloop()