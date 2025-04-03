(ns lommelun
  (:require [org.httpkit.server :as server]))

(defn html-en []
  {:status 200
   :headers {"Content-Type" "text/html; charset=utf-8"}
   :body (slurp "index.html")})

(defn javascript-en []
  {:status 200
   :headers {"Content-Type" "text/javascript; charset=utf-8"}
   :body (slurp "lommelun.js")})

(defn handler [{:keys [request-method uri]}]
  (cond
    (and (= request-method :get)
         (= uri "/"))
    (html-en)

    (and (= request-method :get)
         (= uri "/lommelun.js"))
    (javascript-en)

    :else
    {:status 200 :body "LOL"}))

(defn start! [_]
  (server/run-server #'handler {:port 7777 :legacy-return-value? false}))
