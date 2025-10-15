# ---------- Development Stage ----------
FROM python:3.11-slim AS dev
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY ./app ./app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ---------- Production Stage ----------
FROM python:3.11-slim AS prod
WORKDIR /app

# Create non-root user for security
RUN addgroup --system app && adduser --system --group app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY ./app ./app


# Create all required directories with proper permissions
RUN mkdir -p /app/vector_store && \
    mkdir -p /app/processed && \
    chmod -R 777 /app/vector_store /app/uploads
# Switch to non-root user
USER app

EXPOSE 8000


# Use multiple workers for production
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]