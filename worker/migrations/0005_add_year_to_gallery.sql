-- Migration: Add year column to gallery_images for year-wise filtering
ALTER TABLE gallery_images ADD COLUMN year INTEGER DEFAULT 2024;
UPDATE gallery_images SET year = 2024 WHERE year IS NULL;
