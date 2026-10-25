FROM python:3.11-slim
WORKDIR /app
COPY . .
EXPOSE 8140
CMD ["python", "server/server.py"]
