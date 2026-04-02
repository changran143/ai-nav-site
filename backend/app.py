from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tools.db' # SQLite database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define the Tool model
class Tool(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    logo = db.Column(db.String(100))
    category = db.Column(db.String(100))
    tags = db.Column(db.String(200)) # Storing tags as a comma-separated string
    desc = db.Column(db.Text)
    pricing = db.Column(db.String(50))
    priceRange = db.Column(db.String(100))
    url = db.Column(db.String(200))
    affiliateLink = db.Column(db.String(200))
    rating = db.Column(db.Float)
    reviewCount = db.Column(db.Integer)
    isFeatured = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'logo': self.logo,
            'category': self.category,
            'tags': self.tags.split(',') if self.tags else [], # Convert comma-separated string back to list
            'desc': self.desc,
            'pricing': self.pricing,
            'priceRange': self.priceRange,
            'url': self.url,
            'affiliateLink': self.affiliateLink,
            'rating': self.rating,
            'reviewCount': self.reviewCount,
            'isFeatured': self.isFeatured
        }

# Create database tables and populate with initial data
@app.before_first_request
def create_tables():
    db.create_all()
    # Check if the database is empty, then populate it
    if Tool.query.count() == 0:
        print("Populating database with initial tool data...")
        # Placeholder for initial data. We will get this from script.js later.
        # For now, let's add a dummy tool.
        dummy_tool = Tool(
            id="dummy",
            name="Dummy AI Tool",
            logo="💡",
            category="Test",
            tags="test,dummy",
            desc="This is a dummy AI tool for testing purposes.",
            pricing="free",
            priceRange="免费",
            url="https://example.com",
            affiliateLink="",
            rating=4.0,
            reviewCount=100,
            isFeatured=True
        )
        db.session.add(dummy_tool)
        db.session.commit()
        print("Database populated.")

# API endpoint to get all tools
@app.route('/api/tools', methods=['GET'])
def get_tools():
    tools = Tool.query.all()
    return jsonify([tool.to_dict() for tool in tools])

if __name__ == '__main__':
    # Run the Flask app
    # In a production environment, you would use a production-ready WSGI server like Gunicorn or uWSGI
    app.run(debug=True, port=5000)