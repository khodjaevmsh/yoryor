import multiprocessing

bind = '0.0.0.0:8000'
workers = multiprocessing.cpu_count() * 2 + 1  # Number of workers
timeout = 120
loglevel = 'info'
accesslog = '-'  # Log to stdout
errorlog = '-'  # Log to stderr
