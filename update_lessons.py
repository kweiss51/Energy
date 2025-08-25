#!/usr/bin/env python3
import os
import re
import glob

# Path to the pages directory
base_path = "/Users/kyleweiss/Library/CloudStorage/OneDrive-Personal/Coding/Energy Courses/docs/pages"

# Course directories and their lesson structure
courses = {
    "energy-fundamentals": {
        "week1": ["lesson1", "lesson2", "lesson3"],
        "week2": ["lesson1", "lesson2", "lesson3"], 
        "week3": ["lesson1", "lesson2", "lesson3"]
    },
    "advanced-solar": {
        "week1": ["lesson1", "lesson2", "lesson3"],
        "week2": ["lesson1", "lesson2", "lesson3"],
        "week3": ["lesson1", "lesson2", "lesson3"]
    },
    "grid-mastery": {
        "week1": ["lesson1", "lesson2", "lesson3"],
        "week2": ["lesson1", "lesson2", "lesson3"],
        "week3": ["lesson1", "lesson2", "lesson3"]
    },
    "microgrid-design": {
        "week1": ["lesson1", "lesson2", "lesson3"],
        "week2": ["lesson1", "lesson2", "lesson3"],
        "week3": ["lesson1", "lesson2", "lesson3"]
    },
    "renewable-essentials": {
        "week1": ["lesson1", "lesson2", "lesson3"],
        "week2": ["lesson1", "lesson2", "lesson3"],
        "week3": ["lesson1", "lesson2", "lesson3"]
    },
    "storage-solutions": {
        "week1": ["lesson1", "lesson2", "lesson3"],
        "week2": ["lesson1", "lesson2", "lesson3"],
        "week3": ["lesson1", "lesson2", "lesson3"]
    }
}

# Modern navigation template
nav_template = '''  <nav class="nav-modern">
    <div class="nav-content">
      <a href="../../index.html" class="nav-logo">⚡ Alternata</a>
      <div class="nav-links">
        <a href="../../index.html">🏠 Home</a>
        <a href="../courses.html">📚 Courses</a>
        <a href="../about.html">ℹ️ About</a>
      </div>
      <button class="nav-toggle" onclick="toggleNav()">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div class="nav-mobile">
      <a href="../../index.html">🏠 Home</a>
      <a href="../courses.html">📚 Courses</a>
      <a href="../about.html">ℹ️ About</a>
    </div>
  </nav>'''

# JavaScript for navigation
nav_script = '''
  <script>
    function toggleNav() {
      const navMobile = document.querySelector('.nav-mobile');
      navMobile.classList.toggle('active');
    }
  </script>'''

def get_next_lesson(course, week, lesson):
    """Determine the next lesson in sequence"""
    weeks = list(courses[course].keys())
    lessons = courses[course][week]
    
    current_lesson_index = lessons.index(lesson)
    current_week_index = weeks.index(week)
    
    # If not the last lesson of the week
    if current_lesson_index < len(lessons) - 1:
        next_lesson = lessons[current_lesson_index + 1]
        return f"{week}-{next_lesson}.html"
    
    # If last lesson of week but not last week
    elif current_week_index < len(weeks) - 1:
        next_week = weeks[current_week_index + 1]
        next_lesson = courses[course][next_week][0]
        return f"{next_week}-{next_lesson}.html"
    
    # Last lesson of course
    else:
        return None

def update_lesson_file(filepath):
    """Update a single lesson file with modern navigation and next lesson button"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract course and lesson info from filepath
        parts = filepath.split('/')
        course = parts[-2]  # e.g., 'energy-fundamentals'
        filename = parts[-1]  # e.g., 'week1-lesson1.html'
        
        # Parse week and lesson from filename
        match = re.match(r'(week\d+)-(lesson\d+)\.html', filename)
        if not match:
            print(f"Skipping {filepath} - couldn't parse filename")
            return
        
        week, lesson = match.groups()
        
        # Replace old navigation
        nav_pattern = r'<nav class="nav-minimal"[^>]*>.*?</nav>'
        content = re.sub(nav_pattern, nav_template, content, flags=re.DOTALL)
        
        # Get next lesson
        next_lesson_file = get_next_lesson(course, week, lesson)
        
        # Create next lesson section
        if next_lesson_file:
            next_section = f'''
    <!-- Next Lesson Navigation -->
    <div style="margin-top:3rem;padding:2rem;background:var(--color-surface);border-radius:var(--border-radius);text-align:center;box-shadow:var(--shadow-subtle);">
      <h3 style="margin-bottom:1rem;color:var(--color-text);">🎉 Lesson Complete!</h3>
      <p style="margin-bottom:1.5rem;color:var(--color-text-light);">Great progress! Ready for the next challenge?</p>
      <a href="{next_lesson_file}" class="cta-primary" style="display:inline-flex;align-items:center;gap:0.5rem;">
        Continue to Next Lesson →
      </a>
    </div>

  </main>

{nav_script}
</body>
</html>'''
        else:
            # Last lesson of course
            next_section = f'''
    <!-- Course Complete Navigation -->
    <div style="margin-top:3rem;padding:2rem;background:var(--color-surface);border-radius:var(--border-radius);text-align:center;box-shadow:var(--shadow-subtle);">
      <h3 style="margin-bottom:1rem;color:var(--color-text);">🏆 Course Complete!</h3>
      <p style="margin-bottom:1.5rem;color:var(--color-text-light);">Congratulations! You've completed this course. Explore more courses to continue learning.</p>
      <a href="../courses.html" class="cta-primary" style="display:inline-flex;align-items:center;gap:0.5rem;">
        📚 View All Courses
      </a>
    </div>

  </main>

{nav_script}
</body>
</html>'''
        
        # Replace the end of the file
        end_pattern = r'</main>\s*</body>\s*</html>'
        content = re.sub(end_pattern, next_section, content, flags=re.DOTALL)
        
        # Write updated content back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Updated {filepath}")
        
    except Exception as e:
        print(f"❌ Error updating {filepath}: {e}")

def main():
    """Update all lesson files"""
    for course in courses:
        course_path = os.path.join(base_path, course)
        if os.path.exists(course_path):
            print(f"\n📚 Updating {course}...")
            lesson_files = glob.glob(os.path.join(course_path, "week*.html"))
            for filepath in sorted(lesson_files):
                update_lesson_file(filepath)
        else:
            print(f"⚠️  Course directory not found: {course_path}")
    
    print(f"\n🎉 Lesson updates complete!")

if __name__ == "__main__":
    main()
