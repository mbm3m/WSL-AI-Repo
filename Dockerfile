FROM denoland/deno:alpine-1.45.3
WORKDIR /app
COPY . .
CMD ["run", "--allow-net", "--allow-env", "supabase/functions/analyze-medical-report/index.ts"]
