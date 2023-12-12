import sys
import requests
import time
import os.path

if len(sys.argv) != 4:
  print('\nError: Incorrect number of arguments')
  print('Usage: python3 add_flag_questions.py <amount> <type> <difficulty>')
  sys.exit(1)

amount = int(sys.argv[1])
question_type = sys.argv[2]
difficulty = sys.argv[3]

if amount <= 0 or amount > 500:
  print('\nError: Invalid questions amount. Please keep it 0<amount<=500')
  sys.exit(1)

if question_type not in ['multiple', 'boolean']:
  print('\nError: Invalid question type. Please select from [multiple, boolean]')
  sys.exit(1)

if difficulty not in ['easy', 'medium', 'hard']:
  print('\nError: Invalid difficulty. Please select from [easy, medium, hard]')
  sys.exit(1)

token = ''
if os.path.isfile('./token.txt'):
  print('Using old token')
  f = open('./token.txt', 'r')
  token = f.read()
else:
  print('Getting new token')
  tdb_token_url = 'https://opentdb.com/api_token.php'
  res = requests.get(tdb_token_url, params={'command': 'request'})
  token = res.json()['token']
  f = open('./token.txt', 'w')
  f.write(token)

tdb_url = 'https://opentdb.com/api.php'
api_url = 'http://localhost:4000/api/quizzes'
count = 0
while amount > 0:
  iter = 50 if amount >= 50 else amount
  parameters = {
              'category': 22,
              'token': token,
              'amount': iter,
              'difficulty': difficulty,
              'type': question_type
            }
  tdb_response = requests.get(tdb_url, params=parameters)
  if tdb_response.status_code != 200 or tdb_response.json()['response_code'] != 0:
    print(f'Error retrieving questions. Status code: {tdb_response.json()["response_code"]}')
    sys.exit(1)
  questions = tdb_response.json()['results']

  print(f'Adding {count+iter}/{sys.argv[1]} questions')
  for question in questions:
    api_response = requests.post(api_url, json=question)
    if api_response.status_code != 201:
      print('Error: Failed to POST to db')
      sys.exit(1)

  count = count + iter
  amount = amount - iter
  if amount > 0:
    time.sleep(5)

print('Done. Make sure to delete token.txt if you\'re done generating questions')
