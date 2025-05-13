FROM tomcat:9.0

RUN rm -rf /usr/local/tomcat/webapps/ROOT

COPY target/product-service-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/ROOT.war

EXPOSE 9000

CMD ["catalina.sh", "run"]