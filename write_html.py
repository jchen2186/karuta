# this program creates an html file of all of
# the poems and displays them as a table with
# the Japanese, romaji, and English side by side

def store_poems():
    """stores the poems in a 3 by 100 list
    poems[0] contains a list of the Japanese poems
    poems[1] contains a list of the romaji
    poems[2] contains a list of the English translation"""

    filein = open("formatted_poems.txt", "r")

    # check every group of 18 lines 
    # first 6 lines are Japanese
    # next 6 are romaji
    # last 6 are English translation

    japanese = []
    romaji = []
    english = []

    line = filein.readline()
    num = 0

    while line:
        tmp = ""
        for i in range(6):
            tmp += line
            line = filein.readline()
        
        if (num % 3 == 0):
            japanese.append(tmp)
        elif (num % 3 == 1):
            romaji.append(tmp)
        else: # num % 3 == 2
            english.append(tmp)
        num += 1

    filein.close()

    poems = [japanese, romaji, english]
    return poems

poems = store_poems()

header = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Japanese Alphabet</title>
    <link rel="stylesheet" href="css/styles.css">
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
</head>
<body>
    <div id="table_div">
    <table>
"""

footer = """
    </table>
    </div>
</body>
</html>
"""

def write_body(poems_list):
    body = ""

    for i in range(100):
        body += "\t\t<tr>\n\t\t\t<td>" + str(i + 1) + "</td>\n"
        for j in range(3):
            body += "\t\t\t<td>" + poems_list[j][i].replace("\n", "") + "</td>\n"
        body += "\t\t</tr>\n"

    return body

html = header + write_body(poems) + footer

outfile = open("poems.html", "w")
outfile.write(html)
outfile.close()