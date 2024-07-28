import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error

file_path = "C:\\Users\\MSI1\\Downloads\\dummy_water_management_data.csv"
data = pd.read_csv(file_path)
data['Timestamp'] = pd.to_datetime(data['Timestamp'])
daily_data = data.groupby(data['Timestamp'].dt.date)['Water_Usage_Liters'].sum().reset_index()
daily_data.columns = ['Date', 'Total_Water_Usage_Liters']
daily_data['Lag_1'] = daily_data['Total_Water_Usage_Liters'].shift(1)
daily_data['Lag_2'] = daily_data['Total_Water_Usage_Liters'].shift(2)
daily_data['Lag_3'] = daily_data['Total_Water_Usage_Liters'].shift(3)
daily_data = daily_data.dropna()
X = daily_data[['Lag_1', 'Lag_2', 'Lag_3']]
y = daily_data['Total_Water_Usage_Liters']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=1, shuffle=False)


model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)


print("Test Set Predictions:", y_pred)
print("Actual Values:", y_test.values)
print("Mean Absolute Error:", mae)



import pickle
pkl_filename = "model.pkl"
with open(pkl_filename, 'wb') as file:
    pickle.dump(model, file)

with open(pkl_filename, 'rb') as file:
    pickle_model = pickle.load(file)

score = pickle_model.score(x_test, y_test)
print("Test score: {0:.2f} %".format(100 * score))
Ypredict = pickle_model.predict(x_test)
