FROM python:3.8.10
COPY . /CottonClassification
WORKDIR /CottonClassification
RUN apt-get update
RUN pip install -r requirements.txt
EXPOSE 80
CMD ["python","app.py"]
