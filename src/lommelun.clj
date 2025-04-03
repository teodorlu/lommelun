(ns lommelun
  (:require [org.httpkit.server :as server]))

(defn handler [http-request]
  {:status 200 :body "LOL"})

(defn start! [_]
  (server/run-server handler {:port 7777 :legacy-return-value? false}))
