FROM python:latest

WORKDIR /app

COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY . ./

EXPOSE 5000

CMD ["uvicorn", "main:app", "--reload", \ 
                            "--host", "0.0.0.0"]