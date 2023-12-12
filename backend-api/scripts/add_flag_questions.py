import sys
import requests
import random
import pandas as pd

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

# Load data
df_countries = pd.read_csv('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/csv/countries.csv')
df_countries_popular = pd.read_csv('https://query.data.world/s/aegpctgnxr42pee5lc37i2hlja52ej?dws=00000')
# Aggregate countries by familiarity
df_countries_popular_agg = df_countries_popular.groupby('country', as_index=False) \
                                .agg({'num occurrences': 'sum'}) \
                                .rename(columns={'num occurrences': 'mentions', 'country': 'name'})
# Join dataframes on name
df_countries_joined = df_countries.join(df_countries_popular_agg.set_index('name'), 'name', 'left')
# Fill NaN values with 0
df_countries_joined['mentions'] = df_countries_joined['mentions'].fillna(0)
# Get quantiles to determine difficulty
quantiles = df_countries_joined['mentions'].quantile([.33, .67])
# Filter out countries by difficulty
df_easy_countries = df_countries_joined[df_countries_joined['mentions'] >= quantiles[.67]]
df_medium_countries = df_countries_joined[(df_countries_joined['mentions'] < quantiles[.67])
                                        & (df_countries_joined['mentions'] >= quantiles[.33])]
df_hard_countries = df_countries_joined[df_countries_joined['mentions'] < quantiles[.33]]

image_url_base = 'https://raw.githubusercontent.com/cristiroma/countries/main/data/flags/SVG/'

def get_mc_question(difficulty):
  df_4 = None
  if difficulty == 'easy':
    df_4 = df_easy_countries.sample(4)[['name', 'iso2']]
  elif difficulty == 'medium':
    df_4 = df_medium_countries.sample(4)[['name', 'iso2']]
  else:
    df_4 = df_hard_countries.sample(4)[['name', 'iso2']]

  answer = df_4.iloc[0]
  incorrect_answers = list(df_4.tail(3)['name'])

  return {
      'type': 'multiple',
      'difficulty': difficulty,
      'imageUrl': image_url_base + f'{answer["iso2"]}.svg',
      'question': 'What is the name of this country?',
      'correct_answer': answer['name'],
      'incorrect_answers': incorrect_answers
  }

def get_tf_question(difficulty):
  df_2 = None
  if difficulty == 'easy':
    df_2 = df_easy_countries.sample(2)[['name', 'iso2']]
  elif difficulty == 'medium':
    df_2 = df_medium_countries.sample(2)[['name', 'iso2']]
  else:
    df_2 = df_hard_countries.sample(2)[['name', 'iso2']]

  correct = random.choice([True, False])
  return {
      'type': 'boolean',
      'difficulty': difficulty,
      'imageUrl': image_url_base + f'{df_2.iloc[0]["iso2"]}.svg',
      'question': f'This is the flag of {df_2.iloc[0]["name"] if correct else df_2.iloc[1]["name"]}',
      'correct_answer': 'True' if correct else 'False',
      'incorrect_answers': ['False'] if correct else ['True']
  }

url = 'http://localhost:4000/api/quizzes'
for i in range(amount):
  print(f'Adding {i+1}/{amount}')
  quiz = get_mc_question(difficulty) if question_type == 'multiple' else get_tf_question(difficulty)
  res = requests.post(url, json=quiz)
  if res.status_code != 201:
    print('Error: Failed to POST to db')
    sys.exit(1)

print('Done')
