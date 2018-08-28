import FS
import pandas as pd


pd.options.display.max_colwidth = 100
pd.options.display.max_columns = 10



# ##### Examples: FS #####
# Load workout-history table to dataframe
# Note the 'u' in front, denoting a unicode string

collections = [
    u'workout-history',
    u'can-eat-options',
    u'exercises',
    u'food-items',
    ]

firestore = FS.FS()

# Get all exercises that have a string instead of a DocRef
wh = collections[0]
firestore.loadCollection(wh)
workoutHistory = firestore.collections[wh]
df = pd.DataFrame.from_dict(data)
filtered = df[df['Exercise'].apply(isinstance, args=(str,))]

# # Normalize Data
# Update "Hex deadlift", "Shoulder press", "Bent over row" to title case.
filtered['Exercise'] # show data
# Define a function that checks for title case. Must have value for all use cases.
def isNotTitle(string):
    if string != string.title():
        return True
    else:
        return False

# Apply above function across the filtered series
datasetToUpdate = filtered[filtered['Exercise'].apply(isNotTitle)]
# Filter down to just the IDs
idsToUpdate = datasetToUpdate.id

# Show list of ids to update
[print(i) for i in idsToUpdate][0]

# Update workout-history to have title case
for id in idsToUpdate:
    workoutRef = firestore.db.collection(u'workout-history').document(id)
    workoutSnap = workoutRef.get()
    currDict = workoutSnap.to_dict()
    print(currDict['Exercise'])
    workoutRef.update({ u'Exercise': currDict['Exercise'].title() })

# Get list of exercises and exercise IDs
exerc = collections[2]
firestore.loadCollection(exerc)

exercises = firestore.collections[exerc]
exerciseDF = pd.DataFrame.from_dict(exercises)

# Find matches from workout-history.exercises to list above
firestore.loadCollection(wh) # collection has been updated since initial load
workoutHistory = firestore.collections[wh]
workoutDF = pd.DataFrame.from_dict(workoutHistory)

# See what's in workoutDF
workoutDF[:10]

# Filter workouts again
workoutsFiltered = workoutDF[workoutDF['Exercise'].apply(isinstance, args=(str,))]

# Check the data
workoutsFiltered
exerciseDF

# Check exercise data in Firestore if they match (look on site)
uniques = workoutsFiltered['Exercise'].str.lower().unique()
[print (i) for i in uniques][0]

exercisesLC = exerciseDF['name'].str.lower()
exercisesLC
exercisesFiltered = exerciseDF[exerciseDF['name'].str.lower().isin(uniques)]
exercisesFiltered
exercisesFiltered.columns

exercisesFiltered = exercisesFiltered.rename(columns={'name': 'Exercise'})
mergedDF = workoutsFiltered.join(exercisesFiltered.set_index('Exercise'), on='Exercise',
lsuffix='_workouts', rsuffix='_exercises')

mergedDF[:5]
# Check for misses
mergedDF[mergedDF['docRef_exercises'].isnull()] #0 rows is good
mergedDF
# test changing a single record
lineToEdit = mergedDF[mergedDF['id_workouts']=='4ynzsEh3doOz0w5wwg1P']
lineToEdit
recordRef = lineToEdit['docRef_workouts'].iloc[0]
exerciseRef = lineToEdit['docRef_exercises'].iloc[0]
recordRef.update({ u'Exercise' : 'Bench Press' })

len(mergedDF)

# iterate through dataframe and update the reference
count = 0
for index, row in mergedDF.iterrows():
    count += 1
    recordRef = row['docRef_workouts']
    exerciseRef = row['docRef_exercises']
    recordRef.update({ u'Exercise' : exerciseRef })
    print(row['id_workouts'], row['Exercise'])

print(count)







