import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pandas as pd

creds = 'pythonservice-account-credentials.json'
cred = credentials.Certificate(creds)
firebase_admin.initialize_app(cred)

# ####################################################################################################
class FS():
  def __init__ (self):
    # collection, includeDocRef=False, docRefs=None
    self.db = firestore.client()
    self.collections = {}
    self.collectionIds = None
    self.docRefClass = firestore.firestore.DocumentReference
      
  def loadCollection(self, collection):
    # Note that .get() returns a function that can only be called once
    docs = self.db.collection(collection).get()
    data = self.getDataDocSnapshot(docs, collection)
    self.collections[collection] = data
    # # to push to a df:
    # df = self.getDataDocSnapshot(docs)

   
  # def generateDFfromDocRef(self):
  #   docsFromDRef = self.db.get_all(self.docRefs)
  #   self.includeDocRef = True
  #   df = self.getDataDocSnapshot(docsFromDRef)
  #   return df
    
  def getDataDocSnapshot(self, docs, collection):
    data = []
    for doc in docs:
      curDict = doc.to_dict()
      curDict['id'] = doc.id
      curDict['docRef'] = self.db.document(collection, doc.id)
      data.append(curDict)
    return data

  def loadCollections(self, collections):
    for collection in collections:
      self.loadCollection(collection)

  def getDocRef(self, collection, id):
      """Takes a collection and ID and returns the reference."""
      docRef = self.db.collection(collection).document(id)
      return docRef

  # def filterDF(self, columnToFilterOn, equalsTo=None, contains=None):
  #   if self.dataframe is not None:
  #     df = self.dataframe
  #     if (equalsTo is None) and (contains is None):
  #       filtered = list(df)
  #       print('Here are the columns you can filter on: \n', filtered)
  #     if equalsTo:
  #       filtered = df[df[columnToFilterOn] == equalsTo]
  #     if contains:
  #       filtered = df[df[columnToFilterOn].str.contains(contains, na=False)]
  #     return filtered
  #   else:
  #     print('Dataframe not yet loaded. Please load a dataframe.')
  


# ####################################################################################################




