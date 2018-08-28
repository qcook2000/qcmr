import FS
import pandas as pd
import FSPandas as fpd



print('######################## workout history section ########################')
# ##### Examples: FS #####
# Load workout-history table to dataframe
# Note the 'u' in front, denoting a unicode string
workoutHistId = u'workout-history'
firestore = FS.FS()
workoutHistCollection = firestore.getSnapshotfromCollection(workoutHistId)

whDF = wh.dataframe
whDF[:10]
# Filter the df in various ways
whFiltered = wh.filterDF('Exercise')
whFilteredBench = wh.filterDF('Exercise', equalsTo='Bench Press') #Exact match
whFilteredBench[:3]
whFilteredContainsHex = wh.filterDF('Exercise', contains='Hex') #case sensitive for now
whFilteredContainsHex[:10]
# Get the docRefs in a dataframe
docRefClass = fs.firestore.firestore.DocumentReference
# in the workout history DF, check all exercises that are of type docRefClass
dref = whDF[whDF['Exercise'].apply(isinstance, args=(docRefClass,))]
dref[:5]
wh.db.collection('exercises').document(dref.Exercise[0].id).get().to_dict()
# in workout history DF, check all exercises that are of type str
whStrs = whDF[whDF['Exercise'].apply(isinstance, args=(str,))]
whStrs[:10]



print('######################## food items section ########################')
# Load a second collection, food-items
fiCollection = u'food-items'
foodItems = fs.FirestoreDF(fiCollection, includeDocRef=True)
fiDF = foodItems.dataframe
fiDF[:5]
fiList = fiDF['caneat'][:5].tolist()
[print(i.id) for i in fiList]
docs = foodItems.db.get_all(fiList)
for doc in docs:
    print(doc.to_dict())

print('######################## can-eat-options section ########################')
# Load a collection with document references
ceoCollection = u'can-eat-options'
caneatOpts = fs.FirestoreDF(ceoCollection, includeDocRef=True)
copts = caneatOpts.dataframe
copts[:5]
copts[:5].id
[print(i.id) for i in copts.docRef]

print('######################## load from doc ref section ########################')
# Load a collection from a list of document references
coptsList = copts.docRef.tolist()
coptsFromList = fs.FirestoreDF(None, docRefs=coptsList)
cfl = coptsFromList.dataframe
cfl[:3]

print('######################## load new collection section ########################')
# Load data to new collection
data = {
    u'name': u'Los Angeles',
    u'state': u'CA',
    u'country': u'USA'
}
# Add a new doc in collection 'cities' with ID 'LA'
newCollectionName = u'cities'
newCollection = fs.FirestoreDF(newCollectionName)
newCollection.collection.document(u'LA').set(data)
# Retrieve new collection
cities = fs.FirestoreDF(newCollectionName)
citiesDF = cities.dataframe
citiesDF[:3]


# Get docRef from collection
exercises = u'exercises'
exercises = fs.FirestoreDF(exercises, includeDocRef=True)
exercisesDF = exercises.dataframe
exercisesDocRefs = exercisesDF.docRef.tolist()
for ref in exercisesDocRefs:
    print(ref)
exercisesDFIds = exercisesDF.id

whExerciseDRefs = whDF[whDF['Exercise'].isin(exercisesDocRefs)]
whExerciseDRefList = whExerciseDRefs['Exercise'].tolist()    
exerciseList = fs.FirestoreDF(None, docRefs=whExerciseDRefList, includeDocRef=True)
exerciseList.dataframe
print(df['Exercise'])


for index, row in whStrs.iterrows():
   print (row['id'], row['Exercise'])

wh   

for i in whStrs[:10]:
    row = []
    for j in i:
        row.append(j)
        
whFilteredContainsBench = wh.filterDF('Exercise', contains='Bench') #case sensitive for now
whFilteredContainsBench.id

exercisesFiltered = exercises.filterDF('name', contains='Bench')
exercisesFiltered[:10]

for i in whFilteredContainsBench.id:
    workoutRef = wh.db.collection(u'workout-history').document(i)
    # workoutSnap = workoutRef.get()
    # print(workoutRef)
    workoutRef.update(u'Exercise': 'Bench Press')

# Set the capital field
city_ref.update({u'capital': True})
