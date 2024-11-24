FROM python:3

RUN mkdir /user_data \
    mkdir /usr/src/promnesia

ENV PPATH=/usr/src/promnesia:${PPATH}

VOLUME /user_data

WORKDIR /usr/src/promnesia

#COPY setup.py /usr/src/
#RUN python /usr/src/setup.py #LookupError: setuptools-scm was unable to detect version for '/usr/src/promnesia'.

RUN apt-get update &&  \
    apt-get install -y \
        fd-find        \
    &&                 \
    apt-get clean

RUN pip install --no-cache-dir more_itertools pytz sqlalchemy cachew \
                appdirs urlextract python-magic \
                tzlocal \
                logzero HPI beautifulsoup4 lxml mistletoe orgparse dataset fastapi uvicorn

EXPOSE 13131
CMD ["python", "-m", "promnesia", "serve", "--db", "/user_data/promnesia.sqlite", "--port", "13131"]

COPY src/ .
