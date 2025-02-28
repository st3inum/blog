#include <bits/stdc++.h>
using namespace std;
const int mx = 1002;
int g[mx][mx];
int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int n; cin >> n;
	if(n % 2 == 1) {
		cout << -1 << '\n';
		return 0;
	}
	string s = string(n - 1, 'R') + string(n - 1, 'D') + "L";
	for(int i = 0; i < (n - 1) / 2; i++) {
		s += string(n - 2, 'U') + "L" + string(n - 2, 'D') + "L";
	}
	s += string(n - 1, 'U');
	int x = 0, y = 0;
	for(int i = 0; i < (int)s.size(); i++) {
		if(s[i] == 'L') x--;
		else if(s[i] == 'R') x++;
		else if(s[i] == 'U') y--;
		else y++;
		g[x][y] = (i + 1) % n;
	}
	for(int i = 0; i < n; i++) {
		for(int j = 0; j < n; j++) {
			cout << g[j][i] << " \n"[j + 1 == n];
		}
	}
	cout << s << '\n';
	return 0;
}