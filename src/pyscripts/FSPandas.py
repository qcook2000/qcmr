import pandas as pd

# So we can see full doc references, expand cols from 50 to below
pd.options.display.max_colwidth = 100
pd.options.display.max_columns = 10

class FSP:
    def __init__(self, FS):
        self.frames = {}
        self.collections = FS.collections
    
    def loadFrames(self):
        for collection in self.collections:
            print(collection)

