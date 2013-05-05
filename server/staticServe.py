from twisted.web.server import Site
from twisted.web.static import File
from twisted.internet import reactor
from dropboxBack import dropboxRes

default = File("/var/www/vegeta/vegeta")
default.putChild("dropbox", dropboxRes)
factory = Site(default)
reactor.listenTCP(8888, factory)
reactor.run()
