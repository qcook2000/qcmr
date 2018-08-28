import GSheets as gs


print('######################## gsheets section ########################')
# ##### Examples: GSheets #####
# # View data in spreadsheet
qcWorkoutSheetId = '1hYChT1rrh7qw_29Yy-6aq01sq0map4GcWKiqWZy2gB4'
qcWorkoutSheet = gs.Sheets(qcWorkoutSheetId)
rangeToPull = 'WorkoutHistory!A:E'
qcWorkoutSheet.setValuesFromRange(rangeToPull, headerInFirstRow=True)
for row in qcWorkoutSheet.values:
    print(row)

workoutDF = qcWorkoutSheet.dataframe
workoutDF[:3]
