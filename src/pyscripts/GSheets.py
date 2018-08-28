from __future__ import print_function
from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client import file, client, tools
import pandas as pd

# If modifying these scopes, delete the file token.json.
SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'

# #####################################################################################
class Sheets():
    def __init__(self, spreadsheetId):
        self.service = self.__buildService()
        self.spreadsheetId = spreadsheetId
        self.values = None
        self.dataframe = None
     
    def __buildService(self):
        """Connects to a Google Sheets spreadsheetId."""
        store = file.Storage('gsheetstoken.json')
        creds = store.get()
        service = build('sheets', 'v4', http=creds.authorize(Http()))
        return service
     
    def setValuesFromRange(self, rangeName, headerInFirstRow=False):
        """Sets the self.values as the Google sheets data in the rangeName."""
        # Call the Sheets API
        result = self.service.spreadsheets().values().get(spreadsheetId=self.spreadsheetId,
            range=rangeName).execute()
        values = result.get('values', [])
        self.values = values
        if values:
            self.setDF(headerInFirstRow)

    def setDF(self, headerInFirstRow):
        columns = None
        if headerInFirstRow:
            columns = self.values[0]
        df = pd.DataFrame.from_records(self.values[1:], columns=columns)
        self.dataframe = df

# #####################################################################################

# ##### Examples #####
# # View data in spreadsheet
# qcWorkoutSheetId = '1hYChT1rrh7qw_29Yy-6aq01sq0map4GcWKiqWZy2gB4'
# qcWorkoutSheet = Sheets(qcWorkoutSheetId)
# rangeToPull = 'WorkoutHistory!A:E'
# qcWorkoutSheet.setValuesFromRange(rangeToPull)