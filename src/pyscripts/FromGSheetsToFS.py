
import pandas as pd
import GSheets as gs
import FS

# pull from sheets to df
spreadsheetId = '1hYChT1rrh7qw_29Yy-6aq01sq0map4GcWKiqWZy2gB4'
rangeName = 'WorkoutHistory!A:E'

sheet = gs.Sheets(spreadsheetId)
sheet.setValuesFromRange(rangeName, headerInFirstRow=True)
sheetDF = sheet.dataframe
sheetDF.dtypes

# convert weight, reps to int, timestamp to datetime
sheetDF['weight'] = pd.to_numeric(sheetDF['weight'])
sheetDF['reps'] = pd.to_numeric(sheetDF['reps'])
sheetDF['timestamp'] = pd.to_datetime(sheetDF['timestamp'])

# convert df to dict
workoutDict = sheetDF.to_dict(orient='records')
[print(i) for i in workoutDict][0]
# push dict to firestore
firestore = FS.FS()
workouts = u'workouts'

len(workoutDict)
for i in workoutDict:
    # print(i)
    firestore.db.collection(workouts).add(i)


# Get all exercises that have a string instead of a DocRef
firestore.loadCollection(workouts)
workoutHistory = firestore.collections[workouts]
len(workoutHistory)
df = pd.DataFrame.from_dict(workoutHistory)
df
workoutsFiltered = df[df['exercise'].apply(isinstance, args=(str,))]
workoutsFiltered['exercise'] = workoutsFiltered['exercise'].str.lower()
workoutsFiltered
# Get exercises
uniques = workoutsFiltered['exercise'].str.lower().unique()
firestore.loadCollection(u'exercises')
exercises = firestore.collections[u'exercises']
exerciseDF = pd.DataFrame.from_dict(exercises)
exerciseDF['name'] = exerciseDF['name'].str.lower()
exercisesFiltered = exerciseDF[exerciseDF['name'].isin(uniques)]
exercisesFiltered = exercisesFiltered.rename(columns={'name': 'exercise'})
exercisesFiltered
# join tables
mergedDF = workoutsFiltered.join(exercisesFiltered.set_index('exercise'), on='exercise',
lsuffix='_workouts', rsuffix='_exercises')

mergedDF[:5]
# Check for misses
mergedDF[mergedDF['docRef_exercises'].isnull()] #0 rows is good
mergedDF

len(mergedDF)

# iterate through dataframe and update the reference
count = 0
for index, row in mergedDF.iterrows():
    count += 1
    recordRef = row['docRef_workouts']
    exerciseRef = row['docRef_exercises']
    recordRef.update({ u'exercise' : exerciseRef })
    print(row['id_workouts'], row['exercise'])

print(count)


