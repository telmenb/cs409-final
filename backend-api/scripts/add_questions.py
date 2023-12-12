import sys
import requests
import time

if len(sys.argv) < 3:
  print('\nError: Incorrect number of arguments')
  print('Usage: python3 add_flag_questions.py <amount> <type> <difficulty>')
  sys.exit(1)

amount = int(sys.argv[1])
question_type = sys.argv[2]
difficulty = sys.argv[3]

if amount <= 0 or amount > 300:
  print('\nError: Invalid questions amount. Please keep it 0<amount<=300')
  sys.exit(1)

if question_type not in ['multiple', 'boolean']:
  print('\nError: Invalid question type. Please select from [multiple, boolean]')
  sys.exit(1)

if difficulty not in ['easy', 'medium', 'hard']:
  print('\nError: Invalid difficulty. Please select from [easy, medium, hard]')
  sys.exit(1)

tdb_url = 'https://opentdb.com/api.php'
api_url = 'http://localhost:4000/api/quizzes'
count = 0
while amount > 0:
  iter = 50 if amount >= 50 else amount
  parameters = {
              'category': 22,
              'amount': iter,
              'difficulty': difficulty,
              'type': question_type
            }
  tdb_response = requests.get(tdb_url, params=parameters)
  if tdb_response.status_code != 200:
    print('Error retrieving questions')
    sys.exit(1)
  questions = tdb_response.json()['results']

  print(f'Adding {count+iter}/{sys.argv[1]} questions')
  for question in questions:
    api_response = requests.post(api_url, json=question)
    if api_response.status_code != 201:
      print('Error: Failed to POST to db')
      sys.exit(1)

  amount = amount - iter
  if amount >= 0:
    time.sleep(5)
