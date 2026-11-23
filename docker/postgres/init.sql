SELECT 'CREATE DATABASE kisumu_explorers_test'
WHERE NOT EXISTS (
  SELECT FROM pg_database WHERE datname = 'kisumu_explorers_test'
)\gexec
