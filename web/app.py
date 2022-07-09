from flask import Flask,jsonify,render_template,redirect
import scrape

app = Flask(__name__)

@app.route("/")

def index():
    #  read data from mongodb
    conn = 'mongodb://localhost:27017'
    # client =  pymongo.MongoClient(conn)
    # db = client..............
    # results = db.................find_one()
   
    return render_template("index.html",  listings = results)
    
    #use data to populate index.html

@app.route("/scrape")
def scrape_rte():

    scrape_data = scrape.scrape()
    conn = 'mongodb://localhost:27017'
    # client =  pymongo.MongoClient(conn)
    # db = client.---------------------
    lst = db.list_collection_names()
    if "............." in lst:
        # db.--------------delete_many({})
    # db.----------------.insert_one(scrape_data)
   
    # return redirect("/")

   

if __name__ == "__main__":
    app.run(debug=True)