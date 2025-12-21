FROM nginx:alpine

# Remove default content
RUN rm -rf /usr/share/nginx/html/*

# Copy only the game files
COPY index.html style.css app.js /usr/share/nginx/html/

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
