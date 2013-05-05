from twisted.web import server, resource
from twisted.internet import reactor

from dropbox import client, rest, session

import sys
import urllib2

APP_KEY = 'nwbzsky1odcwo2h'
APP_SECRET = '638w077t12tv9bq'

# ACCESS_TYPE should be 'dropbox' or 'app_folder' as configured for your app
ACCESS_TYPE = 'app_folder'

class Dropboxer:
    authenticated = False
    sess = None
    request_token = None
    access_token = None
    client = None
    url = None

    def getUrl(self):
      print "test"
      self.sess = session.DropboxSession(APP_KEY, APP_SECRET, ACCESS_TYPE)
      print "test"
      self.request_token = self.sess.obtain_request_token()
      print "test"
      self.url = self.sess.build_authorize_url(self.request_token)
      print "test"
      return self.url

    def authenticate(self):
      print self.sess, self.request_token
      self.access_token = self.sess.obtain_access_token(self.request_token)
      self.client = client.DropboxClient(self.sess)
      self.authenticated = True

    def loadImage(self, url):
      imgresponse = urllib2.urlopen(url) 
      imgVal = imgresponse.read()
      
      filename = url.split('/')[-1]
      print filename
      f = self.client.put_file('/' + filename, imgVal)

class DropboxResource(resource.Resource):
    isLeaf = True
    dber = Dropboxer()
    
    def render_GET(self, request):
        request.setHeader("content-type", "text/plain")
        try:
          if ('auth' in request.args): 
            val = request.args['auth'][0]
            print val
            if (val == 'start'): 
              return self.dber.getUrl()
            elif (val == 'resp'):
              self.dber.authenticate()
              return "Authenticated"
          elif ('url' in request.args):
            if(not self.dber.authenticated):
              self.dber.authenticate()
            url2 = request.args['url'][0]
            self.dber.loadImage(url2)


            return "UPLOADED"

        except:
          print "Nothing Requested",  sys.exc_info(), self.dber.url
          return "NOTHING"


dropboxRes = DropboxResource()
