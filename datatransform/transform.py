import os
import csv as CSV


def clean_header(raw_header):
    return raw_header.strip('"').replace(' ', '_').replace('.', '_').lower()


def clean_element(element):
    return element.strip('"')


def csv_to_js(csv):
    json = []
    raw_headers = next(csv)
    headers = [clean_header(raw_header) for raw_header in raw_headers]

    for line in csv:
        obj = {}
        for idx, raw_elem in enumerate(line):
            elem = clean_element(raw_elem)
            key = headers[idx]
            obj[key] = elem
        json.append(obj)

    return json


csv_dir = './csvdata'
js_dir = './jsdata'
file_names = os.listdir('./csvdata')

for file_name in file_names:
    file_path = csv_dir + '/' + file_name
    csv_file = open(file_path, 'r')
    csv = CSV.reader(csv_file, delimiter=',')
    json = csv_to_js(csv)
    csv_file.close()

    json_string = str(json)

    var_name = file_name.replace('.csv', '')
    js_file_name = var_name + '.js'
    js_file = open(js_dir + '/' + js_file_name, 'w+')
    js_var = 'var ' + var_name + '=' + json_string
    js_file.write(js_var)
    js_file.close()
