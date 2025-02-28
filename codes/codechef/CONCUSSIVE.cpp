#include <bits/stdc++.h>
using namespace std;

vector<int> solve(vector<int> &v, bool rev, bool sw) {
	int n = v.size();
	sort(v.begin(), v.end());
	// if(v == vector<int>({1, 2, 3, 4, 5})) return {1, 3, 2, 5, 4};
	if(rev) reverse(v.begin(), v.end());
	vector<int> L(v.begin(), v.begin() + ((n + 1) / 2));
	vector<int> R(v.begin() + ((n + 1) / 2), v.end());
	if(sw && L.size() == R.size()) swap(L, R);
	vector<int> answer;
	for(int i = 0; i < (int)L.size(); i++) {
		answer.push_back(L[i]);
		if(i < (int)R.size()) answer.push_back(R[i]);
	}
	int ok = 1;
	for(int i = 1; i + 1 < n; i++) {
		if(!((answer[i - 1] < answer[i] && answer[i] > answer[i + 1]) || (answer[i - 1] > answer[i] && answer[i] < answer[i + 1]))) {
			ok = 0;
			break;
		}
	}
	if(!ok) return {-1};
	return answer;
}

int32_t main() {
	ios_base::sync_with_stdio(0); cin.tie(0);
	int t; cin >> t; while(t--) {
		int n; cin >> n;
		vector<int> v(n); for(int &i: v) cin >> i;
		vector<int> answer;
		for(int i : {0, 1}) {
			for(int j: {0, 1}) {
				auto temp = solve(v, i, j);
				if(temp[0] != -1) {
					answer = temp;
					break;
				}
			}
			if(answer.size()) break;
		}
		if(answer.size()) for(int i = 0; i < n; i++) cout << answer[i] << " \n"[i + 1 == n];
		else cout << -1 << '\n';
	}
	return 0;
}