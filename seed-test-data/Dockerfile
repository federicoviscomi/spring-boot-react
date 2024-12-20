FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the Python script into the container
COPY *.py /app/

# Install required Python packages
RUN pip3 install requests
#RUN pip3 install os

# Run the Python script when the container starts
ENTRYPOINT ["python", "/app/seed_data.py"]
