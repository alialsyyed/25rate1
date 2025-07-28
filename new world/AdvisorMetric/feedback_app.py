#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import tkinter as tk
from tkinter import ttk, messagebox
import csv
from datetime import datetime
from PIL import Image, ImageTk
import os
import time

class FeedbackApp:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Customer Feedback System")
        self.root.geometry("800x600")
        self.root.configure(bg='#f0f8ff')
        
        # Center the window
        self.root.eval('tk::PlaceWindow . center')
        
        # Configure font for Arabic support
        self.arabic_font = ('Arial Unicode MS', 14)
        self.english_font = ('Arial', 12)
        
        # Current state
        self.current_page = "home"
        self.selected_rating = None
        self.selected_source = None
        
        # Create main frame
        self.main_frame = tk.Frame(self.root, bg='#f0f8ff')
        self.main_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Load logo if exists
        self.logo_image = None
        self.load_logo()
        
        # Create face images
        self.face_images = self.create_face_images()
        
        # Start with home page
        self.show_page_1()
    
    def load_logo(self):
        """Load the logo image if it exists"""
        try:
            if os.path.exists("logo_25.png"):
                # Load and resize logo
                pil_image = Image.open("logo_25.png")
                pil_image = pil_image.resize((120, 120), Image.Resampling.LANCZOS)
                self.logo_image = ImageTk.PhotoImage(pil_image)
            elif os.path.exists("attached_assets/logo_25_1753675354587.png"):
                # Load from attached assets
                pil_image = Image.open("attached_assets/logo_25_1753675354587.png")
                pil_image = pil_image.resize((120, 120), Image.Resampling.LANCZOS)
                self.logo_image = ImageTk.PhotoImage(pil_image)
        except Exception as e:
            print(f"Could not load logo: {e}")
            self.logo_image = None
    
    def create_face_images(self):
        """Create simple face emojis as images"""
        faces = []
        face_emojis = ["😢", "😞", "😐", "😊", "😄"]
        
        for emoji in face_emojis:
            # Create a simple label with emoji as text
            faces.append(emoji)
        
        return faces
    
    def clear_frame(self):
        """Clear all widgets from main frame"""
        for widget in self.main_frame.winfo_children():
            widget.destroy()
    
    def show_page_1(self):
        """Show the first page - rating selection"""
        self.clear_frame()
        self.current_page = "rating"
        
        # Logo
        if self.logo_image:
            logo_label = tk.Label(self.main_frame, image=self.logo_image, bg='#f0f8ff')
            logo_label.pack(pady=(0, 20))
        
        # Arabic question
        arabic_question = tk.Label(
            self.main_frame,
            text="ما مدى رضاك عن خدمتنا؟",
            font=self.arabic_font,
            bg='#f0f8ff',
            fg='#333333'
        )
        arabic_question.pack(pady=(0, 5))
        
        # English translation
        english_question = tk.Label(
            self.main_frame,
            text="How satisfied are you with our service?",
            font=self.english_font,
            bg='#f0f8ff',
            fg='#666666'
        )
        english_question.pack(pady=(0, 30))
        
        # Face buttons frame
        faces_frame = tk.Frame(self.main_frame, bg='#f0f8ff')
        faces_frame.pack(pady=20)
        
        # Create face buttons
        self.face_buttons = []
        colors = ['#ff4444', '#ff8800', '#ffdd00', '#44dd44', '#00aa44']
        
        for i, (face, color) in enumerate(zip(self.face_images, colors)):
            btn = tk.Button(
                faces_frame,
                text=face,
                font=('Arial', 32),
                width=3,
                height=1,
                bg='#e0e0e0',
                activebackground=color,
                relief='raised',
                bd=2,
                command=lambda rating=i+1: self.select_rating(rating, color)
            )
            btn.grid(row=0, column=i, padx=10, pady=10)
            self.face_buttons.append(btn)
        
        # Labels under faces
        labels = ["Very Poor", "Poor", "Fair", "Good", "Excellent"]
        for i, label in enumerate(labels):
            lbl = tk.Label(faces_frame, text=label, font=self.english_font, bg='#f0f8ff')
            lbl.grid(row=1, column=i, pady=(5, 0))
    
    def select_rating(self, rating, color):
        """Handle rating selection with animation"""
        self.selected_rating = rating
        
        # Reset all buttons
        for btn in self.face_buttons:
            btn.configure(bg='#e0e0e0', relief='raised')
        
        # Highlight selected button
        selected_btn = self.face_buttons[rating - 1]
        selected_btn.configure(bg=color, relief='sunken')
        
        # Add slight size animation effect
        selected_btn.configure(font=('Arial', 36))
        self.root.after(200, lambda: selected_btn.configure(font=('Arial', 32)))
        
        # Automatically go to page 2 after 0.5 seconds
        self.root.after(500, self.show_page_2)
    
    def show_page_2(self):
        """Show the second page - source selection"""
        self.clear_frame()
        self.current_page = "source"
        
        # Arabic question
        arabic_question = tk.Label(
            self.main_frame,
            text="كيف تعرفت على مركزنا؟",
            font=self.arabic_font,
            bg='#f0f8ff',
            fg='#333333'
        )
        arabic_question.pack(pady=(20, 5))
        
        # English translation
        english_question = tk.Label(
            self.main_frame,
            text="How did you hear about our center?",
            font=self.english_font,
            bg='#f0f8ff',
            fg='#666666'
        )
        english_question.pack(pady=(0, 30))
        
        # Source buttons frame
        sources_frame = tk.Frame(self.main_frame, bg='#f0f8ff')
        sources_frame.pack(pady=20)
        
        # Source options
        sources = [
            ("Instagram", "📷"),
            ("Snapchat", "👻"),
            ("TikTok", "🎵"),
            ("Google Maps", "🗺️"),
            ("Friends or Family", "👥"),
            ("By Passing By", "🚶")
        ]
        
        # Create source buttons in a grid
        for i, (source, icon) in enumerate(sources):
            btn = tk.Button(
                sources_frame,
                text=f"{icon} {source}",
                font=('Arial', 12),
                width=20,
                height=2,
                bg='#e8f4f8',
                activebackground='#d0e8f0',
                relief='raised',
                bd=2,
                command=lambda s=source: self.select_source(s)
            )
            row = i // 2
            col = i % 2
            btn.grid(row=row, column=col, padx=15, pady=10, sticky='ew')
        
        # Configure grid weights
        sources_frame.grid_columnconfigure(0, weight=1)
        sources_frame.grid_columnconfigure(1, weight=1)
    
    def select_source(self, source):
        """Handle source selection and save data"""
        self.selected_source = source
        self.save_feedback()
        self.show_thank_you()
    
    def save_feedback(self):
        """Save feedback data to CSV file"""
        try:
            # Create CSV file if it doesn't exist
            file_exists = os.path.isfile('feedback_data.csv')
            
            with open('feedback_data.csv', 'a', newline='', encoding='utf-8') as csvfile:
                fieldnames = ['timestamp', 'rating', 'source']
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                
                # Write header if file is new
                if not file_exists:
                    writer.writeheader()
                
                # Write the feedback data
                writer.writerow({
                    'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
                    'rating': self.selected_rating,
                    'source': self.selected_source
                })
            
            print(f"Feedback saved: Rating {self.selected_rating}, Source: {self.selected_source}")
            
        except Exception as e:
            messagebox.showerror("Error", f"Could not save feedback: {e}")
    
    def show_thank_you(self):
        """Show thank you screen"""
        self.clear_frame()
        self.current_page = "thank_you"
        
        # Create centered frame
        thank_you_frame = tk.Frame(self.main_frame, bg='#f0f8ff')
        thank_you_frame.pack(expand=True)
        
        # Thank you message in Arabic
        arabic_thanks = tk.Label(
            thank_you_frame,
            text="شكرًا لمشاركتك 🌟",
            font=('Arial Unicode MS', 24),
            bg='#f0f8ff',
            fg='#2d8f2d'
        )
        arabic_thanks.pack(pady=(50, 20))
        
        # English thank you
        english_thanks = tk.Label(
            thank_you_frame,
            text="Thank you for your feedback!",
            font=('Arial', 16),
            bg='#f0f8ff',
            fg='#2d8f2d'
        )
        english_thanks.pack(pady=(0, 30))
        
        # Countdown label
        self.countdown_label = tk.Label(
            thank_you_frame,
            text="Returning to home in 2 seconds...",
            font=self.english_font,
            bg='#f0f8ff',
            fg='#666666'
        )
        self.countdown_label.pack()
        
        # Start countdown
        self.countdown = 2
        self.update_countdown()
    
    def update_countdown(self):
        """Update countdown and return to home"""
        if self.countdown > 0:
            self.countdown_label.configure(text=f"Returning to home in {self.countdown} seconds...")
            self.countdown -= 1
            self.root.after(1000, self.update_countdown)
        else:
            self.show_page_1()
    
    def add_analytics_button(self):
        """Add analytics button to main window"""
        analytics_btn = tk.Button(
            self.root,
            text="📊",
            font=('Arial', 16),
            width=3,
            height=1,
            bg='#e0e8ff',
            activebackground='#d0d8ef',
            command=self.show_analytics
        )
        analytics_btn.place(x=10, y=10)
    
    def show_analytics(self):
        """Show analytics window"""
        analytics_window = tk.Toplevel(self.root)
        analytics_window.title("Analytics Dashboard")
        analytics_window.geometry("600x500")
        analytics_window.configure(bg='#f5f5f5')
        analytics_window.eval('tk::PlaceWindow . center')
        
        # Read CSV data
        try:
            with open('feedback_data.csv', 'r', encoding='utf-8') as csvfile:
                reader = csv.DictReader(csvfile)
                data = list(reader)
        except FileNotFoundError:
            data = []
        
        # Create main frame
        main_frame = tk.Frame(analytics_window, bg='#f5f5f5')
        main_frame.pack(fill=tk.BOTH, expand=True, padx=20, pady=20)
        
        # Title
        title = tk.Label(
            main_frame,
            text="📊 Feedback Analytics",
            font=('Arial', 18, 'bold'),
            bg='#f5f5f5',
            fg='#333333'
        )
        title.pack(pady=(0, 20))
        
        if not data:
            # No data message
            no_data = tk.Label(
                main_frame,
                text="No feedback data available yet.",
                font=('Arial', 14),
                bg='#f5f5f5',
                fg='#666666'
            )
            no_data.pack(pady=50)
        else:
            # Total feedback
            total_label = tk.Label(
                main_frame,
                text=f"Total Feedback Submissions: {len(data)}",
                font=('Arial', 14, 'bold'),
                bg='#f5f5f5',
                fg='#333333'
            )
            total_label.pack(pady=(0, 15))
            
            # Rating breakdown
            ratings = [int(row['rating']) for row in data]
            rating_counts = {i: ratings.count(i) for i in range(1, 6)}
            rating_labels = {1: "Very Poor", 2: "Poor", 3: "Fair", 4: "Good", 5: "Excellent"}
            
            rating_frame = tk.LabelFrame(main_frame, text="Satisfaction Breakdown", font=('Arial', 12, 'bold'), bg='#f5f5f5')
            rating_frame.pack(fill=tk.X, pady=(0, 15))
            
            for rating, count in rating_counts.items():
                if count > 0:
                    percentage = (count / len(data)) * 100
                    text = f"{rating_labels[rating]}: {count} ({percentage:.1f}%)"
                    label = tk.Label(rating_frame, text=text, font=('Arial', 11), bg='#f5f5f5')
                    label.pack(anchor='w', padx=10, pady=2)
            
            # Source breakdown
            sources = [row['source'] for row in data]
            source_counts = {}
            for source in sources:
                source_counts[source] = source_counts.get(source, 0) + 1
            
            source_frame = tk.LabelFrame(main_frame, text="Source Breakdown", font=('Arial', 12, 'bold'), bg='#f5f5f5')
            source_frame.pack(fill=tk.X, pady=(0, 15))
            
            for source, count in source_counts.items():
                percentage = (count / len(data)) * 100
                text = f"{source}: {count} ({percentage:.1f}%)"
                label = tk.Label(source_frame, text=text, font=('Arial', 11), bg='#f5f5f5')
                label.pack(anchor='w', padx=10, pady=2)
            
            # Average rating
            avg_rating = sum(ratings) / len(ratings)
            avg_label = tk.Label(
                main_frame,
                text=f"Average Rating: {avg_rating:.2f}/5.0",
                font=('Arial', 14, 'bold'),
                bg='#f5f5f5',
                fg='#2d8f2d'
            )
            avg_label.pack(pady=15)
        
        # Close button
        close_btn = tk.Button(
            main_frame,
            text="Close",
            font=('Arial', 12),
            command=analytics_window.destroy,
            bg='#e0e0e0',
            activebackground='#d0d0d0'
        )
        close_btn.pack(pady=20)
    
    def run(self):
        """Run the application"""
        # Add analytics button
        self.add_analytics_button()
        
        # Start the main loop
        self.root.mainloop()

if __name__ == "__main__":
    app = FeedbackApp()
    app.run()