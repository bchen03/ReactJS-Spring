FROM xaxiseng/base-java8
MAINTAINER mStore Backend Team
COPY ["target/react-and-spring-data-rest-basic-*.jar", "run.sh", "/opt/reactjs-spring/"]
RUN chmod +x /opt/reactjs-spring/run.sh
ENTRYPOINT ["/opt/reactjs-spring/run.sh"]
CMD ["--filespath=file:/opt/reactjs-spring/files/"]
VOLUME /opt/reactjs-spring/files
EXPOSE 8080
